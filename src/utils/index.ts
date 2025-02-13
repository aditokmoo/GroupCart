import { db } from "../services/firebase.config";
import { clsx, type ClassValue } from "clsx"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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