import useToggle from "../../hooks/useToggle";
import MobileNav from "../Navbar/MobileNav";
import ShoppingItem from "./ShoppingItem";
import { FaPlus } from "react-icons/fa6";
import ShoppingForm from "./ShoppingForm";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function ShoppingList({ data }: { data?: Group | null }) {
    const { isActive, toggle } = useToggle();

    return (
        <div className="flex flex-col max-w-[700px] mx-auto w-full">
            <div className="bg-light-primary py-4 px-4 md:px-10">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-20 text-xs px-12">
                        <p>Status</p>
                        <p>Name</p>
                    </div>
                    <p className="text-xs mr-20">Price</p>
                </div>
                <div className="relative flex flex-col gap-6 h-list-screen overflow-auto px-12 pb-12">
                    {data?.groupList.map((item) => (
                        <ShoppingItem data={item} key={item.id} />
                    ))}
                </div>

                <MobileNav toggle={toggle} />

                {isActive["NewItemForm"] && (
                    <Dialog open={isActive["NewItemForm"]} onOpenChange={() => toggle("NewItemForm")}>
                        <DialogTrigger className="fixed bottom-10 right-8 p-4 border-2 border-primary rounded-full"><FaPlus className="text-2xl text-primary" /></DialogTrigger>
                        <ShoppingForm toggle={() => toggle("NewItemForm")} />
                    </Dialog>
                )}
            </div>
        </div>
    )
}
