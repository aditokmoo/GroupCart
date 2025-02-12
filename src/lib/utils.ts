import { db } from "../services/firebase.config";
import { clsx, type ClassValue } from "clsx"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addDataToFirestore = async (collection: string, id: string, data: FirestoreData): Promise<void> => {
  try {
    await setDoc(doc(db, collection, id), data);
  } catch (error) {
    console.error('Failed to add data to Firestore:', error);
    throw error;
  }
}

export const getUserGroups = async (groupQuery: string, groupValue: string): Promise<Group[] | null> => {
  try {
    const groupsCollectionRef = collection(db, "groups");
    const q = query(groupsCollectionRef, where(groupQuery, "array-contains", groupValue));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return []

    const groups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      groupName: doc.data().groupName,
      createdBy: doc.data().createdBy,
      members: doc.data().members,
      groupList: doc.data().groupList,
    }));

    return groups;
  } catch (error) {
    console.error("Error getting groups:", error);
    throw error;
  }
};

export const getGroup = async (groupId: string): Promise<Group | null> => {
  try {
    const groupRef = doc(db, "groups", groupId);
    const groupSnap = await getDoc(groupRef);

    if (!groupSnap.exists()) {
      return null;
    }

    const data = groupSnap.data() as Omit<Group, 'id'>
    return { id: groupSnap.id, ...data };
  } catch (error) {
    console.error("Error getting group:", error);
    throw error;
  }
};

export const isUserRegistered = async (
  collectionName: string,
  field: string,
  value: string
): Promise<boolean> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(field, "==", value));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Failed to check user registration:", error);
    throw error;
  }
};

export const getUser = async (email: string): Promise<User | null> => {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null

    const data = querySnapshot.docs[0].data()

    const user = {
      uid: data.uid,
      email: data.email,
      username: data.username,
      profileImage: data.profileImage
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};