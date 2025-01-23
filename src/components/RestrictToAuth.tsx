import { ReactNode } from 'react'
import { Navigate } from 'react-router';

export default function RestrictToAuth({ children }: { children: ReactNode }) {
    const user = false;

    return user ? <Navigate to={'/'} /> : children
}