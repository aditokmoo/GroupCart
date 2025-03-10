import { FaUserGroup } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useAuth";
import { useGetGroup } from "../../hooks/useGroup";

export default function Navbar() {
    const { data: user } = useCurrentUser();
    const { pathname } = useLocation();
    const { groupId } = useParams();
    const { data: groupData } = useGetGroup(groupId ?? '');
    const isGroupOpen = pathname === `/shopping-list/${groupId}`

    return (
        <nav className="fixed top-0 z-40 left-0 w-full p-6 bg-white border-b border-gray-300">
            <div className="w-full flex items-center justify-between px-8">
                {isGroupOpen && (
                    <div className="flex items-center gap-3">
                        <FaUserGroup className="text-xl" />
                        <span className="text-sm relative top-[0.1rem]">{groupData?.members.length}</span>
                    </div>
                )}
                <h2 className="text-center w-full">Welcome to <span className="text-primary">{isGroupOpen ? groupData?.groupName : user?.displayName}</span></h2>
                <Link to='/profile' className="text-3xl flex justify-end">{user?.photoURL ? <img className="w-12 h-12 object-cover rounded-full shadow-md border border-gray-50" src={user?.photoURL} alt="" /> : <FaUserCircle />}</Link>
            </div>
        </nav>
    )
}
