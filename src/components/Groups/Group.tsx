import useAuthStore from '../../stores/authStore'
import { FaListCheck } from 'react-icons/fa6'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Group({ data }: { data: Group }) {
    const { user } = useAuthStore();

    return (
        <Link to={`/shopping-list/${data.id}`} className="flex h-48 cursor-pointer hover:opacity-80 w-full relative bg-white shadow-md">
            <div className="h-full w-2 bg-primary"></div>
            <div className="flex flex-col gap-2 p-4">
                <h2 className="text-2xl">{data.groupName}</h2>
                <div className="flex items-center gap-1">
                    {data.members.map((member) => (
                        <img key={member} className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" alt="" />
                    ))}
                </div>
                <p className="text-xs absolute bottom-2 text-gray-500 flex items-center gap-1 italic"><IoInformationCircleOutline />{data.groupList.length === 0 ? `${data.createdBy === user?.email ? 'You' : data.createdBy} created this group` : `${data.groupList[data.groupList.length - 1]?.addedBy} je dodao ${data.groupList[data.groupList.length - 1]?.name}`}</p>
                <div className="flex items-center gap-2 absolute top-3 right-4">
                    <FaListCheck />
                    {data.groupList.length}
                </div>
            </div>
        </Link>
    )
}
