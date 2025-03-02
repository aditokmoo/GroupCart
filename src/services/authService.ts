import { auth } from "../lib/firebase.config";
import { addDataToFirestore } from "../utils";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, provider);
        await addDataToFirestore("users", user.uid, { uid: user.uid, username: user.displayName, email: user.email });
        console.log(user)
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
    }
}