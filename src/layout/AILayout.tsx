import { FiChevronLeft } from 'react-icons/fi'
import { Outlet } from 'react-router'

export default function AILayout() {
    return (
        <div className="min-h-screen flex flex-col">

            <button onClick={() => history.back()} className='absolute top-16 left-10 text-2xl'><FiChevronLeft /></button>

            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}