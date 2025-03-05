import { useCurrentUser } from '../hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from './ui/Loading';

export default function RestrictToAuth({ children }: { children: ReactNode }) {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <Loading />;

    return user ? <Navigate to="/shopping-list" /> : children
}