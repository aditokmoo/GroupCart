import { GoChevronDown } from "react-icons/go";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from '@dnd-kit/sortable';
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu"
import { useUpdateShoppingItemStatus } from "../../hooks/useShoppingList";

export default function ShoppingItem({ data }: { data: ShoppingItem }) {
    const { mutate: handleShopItemStatus } = useUpdateShoppingItemStatus();
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
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-0 focus-visible:outline-none active:outline-none">
                                <GoChevronDown className="text-gray-400 text-xl cursor-pointer" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-72 translate-x-[38px] translate-y-[10px] transform">
                                <DropdownMenuLabel className="px-6 py-4 text-xs">Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleShopItemStatus({ status: 'success', itemId: data.id })} className={`cursor-pointer px-6 py-4 hover:outline-none text-xs flex items-center gap-4 ${data.status === 'success' && 'bg-light-success'}`}><div className="w-4 h-4 bg-success rounded-full"></div> Nabavljeno</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShopItemStatus({ status: 'pending', itemId: data.id })} className={`cursor-pointer px-6 py-4 hover:outline-none text-xs flex items-center gap-4 ${data.status === 'pending' && 'bg-light-pending'}`}><div className="w-4 h-4 bg-pending rounded-full"></div> Nije nabavljeno</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="font-semibold">{data.name}</h3>
                        <span className={`text-xs font-semibold ${data.status === 'success' ? 'text-success' : 'text-pending'}`}>{data.status === 'success' ? 'Nabavljeno' : 'Nije nabavljeno'}</span>
                    </div>
                </div>

                <div className="flex justify-center w-1/4">
                    <p className="text-sm font-semibold">{data.price} BAM</p>
                </div>

            </div>
        </div>
    )
}
