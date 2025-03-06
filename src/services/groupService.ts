import { collection, deleteDoc, doc, getDoc, getDocs, query, runTransaction, where } from "firebase/firestore";
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

export const leaveGroup = async (groupId: string, user: string): Promise<void> => {
    try {
        const groupRef = doc(db, "groups", groupId);

        await runTransaction(db, async (transaction) => {
            const docSnap = await transaction.get(groupRef);
            if (!docSnap.exists()) throw new Error("Group does not exist");

            const data = docSnap.data();
            const updatedMembers = data.members?.filter((member: string) => member !== user) || [];

            transaction.update(groupRef, { members: updatedMembers });

            if (updatedMembers.length === 0) {
                transaction.delete(groupRef);
            }
        });
    } catch (error) {
        console.error("Error leaving group:", error);
    }
};

export const deleteGroup = async (groupId: string): Promise<void> => {
    try {
        const groupRef = doc(db, "groups", groupId);
        await deleteDoc(groupRef);
    } catch (error) {
        console.log("Error deleting group:", error);
    }
};