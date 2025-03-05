import { useCurrentUser } from '../hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from './ui/Loading';

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <Loading />;

    return user ? children : <Navigate to="/login" />;
}