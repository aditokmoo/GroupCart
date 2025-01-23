import { create } from 'zustand';
import {
    GoogleAuthProvider,
    User,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { auth } from '@/services/firebase.config';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    googleSignIn: () => Promise<void>;
    logOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ isLoading: loading }),

    googleSignIn: async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
        }
    },

    logOut: async () => {
        set({ isLoading: true });
        try {
            await signOut(auth);
            set({ user: null });
        } catch (error) {
            console.error('Error during sign-out:', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useAuthStore;