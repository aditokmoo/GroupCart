import { LucideSettings } from 'lucide-react';
import { useCurrentUser } from '../../hooks/useAuth';
import { FaListCheck } from 'react-icons/fa6'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { RiUserAddFill } from "react-icons/ri";
import { FaRegTrashAlt } from 'react-icons/fa';
import { TbArrowLeftToArc } from 'react-icons/tb';
import { useDeleteGroup, useLeaveGroup } from '../../hooks/useGroup';

export default function Group({ data }: { data: Group }) {
    const { data: user } = useCurrentUser();
    const { mutate: deleteGroup } = useDeleteGroup();
    const { mutate: leaveGroup } = useLeaveGroup();

    return (
        <div className="relative">
            <Link to={`/shopping-list/${data.id}`} className="flex h-48 cursor-pointer hover:opacity-80 w-full relative bg-white shadow-md">
                <div className="h-full w-2 bg-primary"></div>
                <div className="flex flex-col gap-2 p-4">
                    <h2 className="text-2xl">{data.groupName}</h2>
                    <div className="flex items-center gap-1">
                        {data.members.map((member) => (
                            <img key={member} className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" alt="" />
                        ))}
                    </div>
                    <p className="text-xs absolute bottom-2 text-gray-500 flex items-center gap-1 italic"><IoInformationCircleOutline />{data.groupList.length === 0 ? `${data.createdBy === user?.email ? 'You' : data.createdBy} created this group` : `${data.groupList[data.groupList.length - 1]?.addedBy === user?.displayName ? 'Ti si' : `${data.createdBy} je`} dodao ${data.groupList[data.groupList.length - 1]?.name}`}</p>
                    <div className="flex items-center gap-2 absolute top-3 right-4">
                        <FaListCheck />
                        {data.groupList.length}
                    </div>
                </div>
            </Link>
            <div className="absolute p-4 right-0 bottom-0">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-0 focus-visible:outline-none active:outline-none">
                        <LucideSettings className='cursor-pointer hover:text-primary' />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-72 translate-x-[-1.6rem] shadow-lg transform z-40 bg-white">
                        <DropdownMenuLabel className="px-6 py-4 text-xs">Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {data.createdBy === user?.email ? (
                            <>
                                <DropdownMenuItem className='text-xs p-4 cursor-pointer focus:bg-gray-100 flex items-center gap-2'><RiUserAddFill /> Add members</DropdownMenuItem>
                                <DropdownMenuItem className='text-xs p-4 cursor-pointer focus:bg-gray-100 flex items-center gap-2'><FiEdit /> Edit Group</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => leaveGroup({ groupId: data.id, user: user?.email })} className='text-xs p-4 cursor-pointer focus:bg-gray-100 flex items-center gap-2'><TbArrowLeftToArc /> Leave Group</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteGroup(data.id)} className='text-xs p-4 cursor-pointer text-pending focus:bg-pending focus:text-white font-semibold flex items-center gap-2'><FaRegTrashAlt /> Delete Group</DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={() => user?.email && leaveGroup({ groupId: data.id, user: user.email })} className='text-xs p-4 cursor-pointer focus:bg-gray-100 flex items-center gap-2'><TbArrowLeftToArc /> Leave Group</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
