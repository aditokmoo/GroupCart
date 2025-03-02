import { useMutation, useQuery } from '@tanstack/react-query';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase.config';
import { addDataToFirestore } from '../utils';
import { getUser } from '../services/userService';
import { useNavigate } from 'react-router';
import { googleSignIn } from '../services/authService';

export const useLoginWithGoogle = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate('/shopping-list')
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
        }
    }

    return handleGoogleSignIn;
}

export const useLoginWithPassword = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ email, password }: UserRequest) =>
            signInWithEmailAndPassword(auth, email, password),
        onSuccess: () => {
            navigate('/shopping-list');
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    })

    return mutation
};

export const useRegister = () => {
    const mutation = useMutation({
        mutationFn: async ({ email, password, username }: { email: string, password: string, username: string }) => {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(user, {
                displayName: username,
            });

            return user;
        },

        onSuccess: async (user) => {
            await addDataToFirestore("users", user.uid, { uid: user.uid, username: user.displayName, email: user.email, photoURL: user.photoURL });
        },
        onError: (error) => {
            console.error('Registration failed:', error.message);
        },
    });

    return mutation;
};

export const useGetUser = () => {
    const { data: user } = useCurrentUser();

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

export const useCurrentUser = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            new Promise<User | null>((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    if (currentUser) {
                        resolve({
                            uid: currentUser.uid,
                            email: currentUser.email || '',
                            displayName: currentUser.displayName || '',
                            photoURL: currentUser.photoURL || '',
                        });
                    } else {
                        resolve(null);
                    }
                });

                return () => unsubscribe();
            }),
    });

    return { data, isLoading }
}

export function useLogout() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => signOut(auth),
        onSuccess: () => {
            navigate('/login')
        },
        onError: (error) => {
            console.error('Error with signOut:', error);
        },
    });

    return { mutate, isPending }
}