import useAuthStore from '../stores/authStore';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function RestrictToAuth({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuthStore();

    if (isLoading) return <div>Loading...</div>;

    return user ? <Navigate to="/shopping-list" /> : children
}