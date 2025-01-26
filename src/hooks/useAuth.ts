import { useMutation } from '@tanstack/react-query';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import useAuthStore from '../stores/authStore';
import { auth } from '@/services/firebase.config';
import { addUserToFirestore } from '@/lib/utils';

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
        mutationFn: ({ email, password }: UserRequest) =>
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
        mutationFn: async ({ email, password, username }: { email: string, password: string, username: string }) => {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(user, {
                displayName: username,
            });

            return user;
        },

        onSuccess: async (user) => {
            setUser(user);
            await addUserToFirestore(user.uid, user.email!, user.displayName!);

        },
        onError: (error) => {
            console.error('Registration failed:', error.message);
        },
    });

    return mutation;
};
