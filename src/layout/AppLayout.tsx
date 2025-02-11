import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}
