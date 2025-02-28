import { GoChevronDown } from "react-icons/go";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from '@dnd-kit/sortable';

export default function ShoppingItem({ data }: { data: ShoppingItem }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: data.order });

    const style = {
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        transition: transform ? transition : "none",
    };

    return (
        <div ref={setNodeRef} style={style} className="relative px-10 py-6 rounded-[1.7rem] bg-white w-full shadow-md">

            <MdDragIndicator
                {...listeners}
                {...attributes}
                className="absolute left-[-2.4rem] top-10 cursor-grab text-2xl focus:outline-none active:cursor-grabbing"
            />

            <div className="flex justify-between items-center">

                <div className="flex gap-10 items-center w-full">
                    <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full shadow-sm ${data.status === 'success' ? 'bg-success' : 'bg-pending'}`}></div>
                        <GoChevronDown className="text-gray-400 text-xl cursor-pointer" />
                    </div>

                    <div className="flex flex-col">
                        <h3 className="font-semibold">{data.name}</h3>
                        <span className={`text-xs font-semibold ${data.status === 'success' ? 'text-success' : 'text-pending'}`}>{data.status === 'success' ? 'Nabavljeno' : 'Nije nabavljeno'}</span>
                    </div>
                </div>

                <div className="flex justify-center w-1/4">
                    <p className="text-sm">{data.price}</p>
                </div>

            </div>
        </div>
    )
}
