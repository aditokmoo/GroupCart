import useAuthStore from "../../stores/authStore";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user } = useAuthStore();
    const { pathname } = useLocation();
    const { groupId } = useParams();
    const isGroupOpen = pathname === `/shopping-list/${groupId}`

    return (
        <nav className="fixed top-0 z-40 left-0 w-full p-6 bg-white border-b border-gray-300">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-center w-full">Welcome <span className="text-primary">{isGroupOpen ? 'to Group' : user?.displayName}</span></h2>
                <Link to='/profile' className="text-3xl flex justify-end">{user?.photoURL ? <img className="w-12 h-12 object-cover rounded-full shadow-md border border-gray-50" src={user?.photoURL} alt="" /> : <FaUserCircle />}</Link>
            </div>
        </nav>
    )
}
