import { useMutation, useQuery } from '@tanstack/react-query';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import useAuthStore from '../stores/authStore';
import { auth } from '../services/firebase.config';
import { addDataToFirestore, getUser } from '../lib/utils';

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
            await addDataToFirestore("users", user.uid, { uid: user.uid, username: user.displayName, email: user.email, profileImage: user.photoURL });
        },
        onError: (error) => {
            console.error('Registration failed:', error.message);
        },
    });

    return mutation;
};

export const useGetUser = () => {
    const user = useAuthStore((state) => state.user);

    const query = useQuery({
        queryKey: ["get_user", user?.email],
        queryFn: () => {
            if (!user?.email) return Promise.resolve(null);
            return getUser(user.email);
        },
        enabled: !!user?.email,
    });

    return query;
}