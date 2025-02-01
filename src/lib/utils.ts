import { db } from "../services/firebase.config";
import { clsx, type ClassValue } from "clsx"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addDataToFirestore = async (collection: string, id: string, data: FirestoreData): Promise<void> => {
  try {
    console.log(data)
    await setDoc(doc(db, collection, id), data);
  } catch (error) {
    console.error('Failed to add data to Firestore:', error);
    throw error;
  }
}

export const getUserGroups = async (userEmail: string) => {
  try {
    // Referenca na grupnu kolekciju
    const groupsCollectionRef = collection(db, "groups");

    // Upit za filtriranje grupa gde je userEmail u members
    const q = query(groupsCollectionRef, where("members", "array-contains", userEmail));

    // Dohvatimo sve dokumente koji odgovaraju upitu
    const querySnapshot = await getDocs(q);

    // Ako nema rezultata, vraćamo prazan niz
    if (querySnapshot.empty) {
      return [];
    }

    // Mapiramo sve dokumente u rezultat
    const groups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return groups; // Vraća listu grupa gde je korisnik član
  } catch (error) {
    console.error("Error getting groups:", error);
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