import { ReactNode } from 'react'
import { Navigate } from 'react-router';

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const user = false;

    return user ? children : <Navigate to={'/login'} />
}