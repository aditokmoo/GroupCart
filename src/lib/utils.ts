import { db } from "@/services/firebase.config";
import { clsx, type ClassValue } from "clsx"
import { doc, setDoc } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addUserToFirestore = async (uid: string, email: string, username: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      username,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to add user to Firestore:', error);
    throw error;
  }
};