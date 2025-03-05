import { useCurrentUser, useGetUser, useLogout } from '../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../components/ui/Loading';

export default function Profile() {
    const { data: user } = useCurrentUser();
    const { data: userData, isLoading: isLoadingUser } = useGetUser();
    const { mutate: signOut, isPending: isSigningOut } = useLogout();

    if (isLoadingUser || isSigningOut) return <Loading />

    return (
        <div className="pt-52 bg-light-primary h-screen flex flex-col gap-4 items-center">
            {user?.photoURL ? <img className="w-32 h-32 rounded-full" src={userData?.photoURL} alt="Profile Picture" /> : <FaUserCircle className='text-[6rem]' />}
            <h2 className='text-4xl'>{userData?.displayName}</h2>
            <span className='text-sm'>{userData?.email}</span>

            <div className="flex gap-4 mt-12">
                <Link to='/shopping-list' className='bg-primary text-white w-48 text-center py-4 rounded-md text-sm'>Go back</Link>
                <button onClick={() => signOut()} className='bg-black text-white rounded-md w-48 py-4 text-sm'>Logout</button>
            </div>
        </div>
    )
}
