import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import MobileNav from '../components/Navbar/MobileNav'
import useToggle from '../hooks/useToggle'
import useShoppingCamera from '../hooks/useShoppingCamera';

export default function GroupLayout() {
    const { toggle } = useToggle();
    const { handleCameraToggle } = useShoppingCamera();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <MobileNav toggle={toggle} handleCameraToggle={handleCameraToggle} />
        </div>
    )
}