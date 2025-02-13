import { MdAddCircleOutline, MdOutlineCameraAlt } from "react-icons/md";

export default function MobileNav() {
    return (
        <div className="fixed bottom-0 z-40 left-0 w-full bg-white border-t text-2xl border-gray-300 flex items-center justify-between">
            <button className="w-full border-r border-gray-300 text-center flex flex-col items-center justify-center hover:bg-gray-50 transition-all duration-300 py-6"><MdOutlineCameraAlt />
                <span className="text-xs text-gray-500">Scan bill</span>
            </button>
            <button className="w-full text-center flex justify-center flex-col items-center hover:bg-gray-50 transition-all duration-300 py-6"><MdAddCircleOutline />
                <span className="text-xs text-gray-500">Add new item</span>
            </button>
        </div>
    )
}
