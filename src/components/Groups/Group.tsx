import { FaListCheck } from 'react-icons/fa6'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Group({ data }: { data: any }) {
    return (
        <Link to={`/${data}`} key={data} className="flex h-48 cursor-pointer hover:opacity-80 w-full relative bg-white shadow-md">
            <div className="h-full w-2 bg-primary"></div>
            <div className="flex flex-col gap-2 p-4">
                <h2 className="text-2xl">BBQ Party</h2>
                <div className="flex items-center gap-1">
                    <img className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" alt="" />
                    <img className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-50" src="https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                    <img className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-50" src="https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072178.jpg" alt="" />
                    <img className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-50" src="https://images.stockcake.com/public/5/e/a/5ea025d2-9dfe-425d-aee4-006b6d40c0a8_large/handsome-smiling-man-stockcake.jpg" alt="" />
                </div>
                <p className="text-xs absolute bottom-2 text-gray-500 flex items-center gap-1 italic"><IoInformationCircleOutline /> adi.tokmo je dodao novu stavku: "hljeb"</p>
                <div className="flex items-center gap-2 absolute top-3 right-4">
                    <FaListCheck />
                    10
                </div>
            </div>
        </Link>
    )
}
