import MobileNav from "../Navbar/MobileNav";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingList({ data }: { data?: Group | null }) {
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
                <div className="relative flex flex-col gap-6 h-[67rem] overflow-auto px-12 pb-12">
                    {data?.groupList.map((item) => (
                        <ShoppingItem data={item} key={item.id} />
                    ))}
                </div>

                <MobileNav />
            </div>
        </div>
    )
}
