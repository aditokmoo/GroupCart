import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase.config";

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
            displayName: data.username,
            photoURL: data.photoURL
        }

        return user;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
};