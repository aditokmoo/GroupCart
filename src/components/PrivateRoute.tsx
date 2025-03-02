import { useCurrentUser } from '../hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
}