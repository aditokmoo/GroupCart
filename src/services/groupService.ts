import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase.config";

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

        if (!groupSnap.exists()) return null;

        const data = groupSnap.data() as Omit<Group, 'id'>
        return { id: groupSnap.id, ...data };
    } catch (error) {
        console.error("Error getting group:", error);
        throw error;
    }
};