import { db } from "@/services/firebase.config";
import { clsx, type ClassValue } from "clsx"
import { doc, setDoc } from "firebase/firestore";
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