import { useMutation } from '@tanstack/react-query';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import useAuthStore from '../stores/authStore';
import { auth } from '@/services/firebase.config';

export const useLoginWithGoogle = () => {
    const googleSignIn = useAuthStore((state) => state.googleSignIn);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
        }
    }

    return handleGoogleSignIn;
}

export const useLoginWithPassword = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const mutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            signInWithEmailAndPassword(auth, email, password),
        onSuccess: (data) => {
            setUser(data.user);
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    })

    return mutation
};

export const useRegister = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const mutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            createUserWithEmailAndPassword(auth, email, password),
        onSuccess: (data) => {
            setUser(data.user);
        },
        onError: (error) => {
            console.error('Registration failed:', error.message);
        },
    });

    return mutation;
};
