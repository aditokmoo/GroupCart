import useAuthStore from '@/stores/authStore';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user, logOut } = useAuthStore();

    console.log(user)

    return (
        <div className="mt-52 flex flex-col gap-4 items-center justify-center">
            {user?.photoURL ? <img className="w-32 h-32 rounded-full" src={user?.photoURL} alt="" /> : <FaUserCircle className='text-[6rem]' />}
            <h2 className='text-4xl'>{user?.displayName}</h2>
            <span className='text-sm'>{user?.email}</span>

            <div className="flex gap-4 mt-12">
                <Link to='/shopping-list' className='bg-primary text-white w-48 text-center py-4 rounded-md text-sm'>Go back</Link>
                <button onClick={logOut} className='bg-black text-white rounded-md w-48 py-4 text-sm'>Logout</button>
            </div>
        </div>
    )
}
