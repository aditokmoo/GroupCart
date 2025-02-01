import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthStore from '../stores/authStore';
import { auth } from '../services/firebase.config';

export const useAuthListener = () => {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        setLoading(true);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setLoading]);

};
