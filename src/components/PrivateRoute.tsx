import useAuthStore from '../stores/authStore';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuthStore();

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
        <Navigate to="/login" />
    }

    return children;
}