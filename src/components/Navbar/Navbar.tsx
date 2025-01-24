import useAuthStore from "@/stores/authStore";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user } = useAuthStore();

    return (
        <nav className="fixed top-0 z-40 left-0 w-full p-6 bg-white border-b border-gray-300">
            <div className="w-full md:max-w-[540px] mx-auto flex items-center justify-between">
                <h2>Welcome <span className="text-primary">{user?.displayName}</span></h2>
                <Link to='/profile' className="text-3xl flex justify-end">{user?.photoURL ? <img className="w-12 h-12 object-cover rounded-full shadow-md border border-gray-50" src={user?.photoURL} alt="" /> : <FaUserCircle />}</Link>
            </div>
        </nav>
    )
}
