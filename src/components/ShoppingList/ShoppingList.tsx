import ShoppingItem from "./ShoppingItem";

const data = [
    {
        id: 0,
        name: '3x Chunga Lunga',
        price: '2.60 BAM',
        status: "success",
    },
    {
        id: 1,
        name: '2kg Fileta',
        price: '2.60 BAM',
        status: "success",
    },
    {
        id: 2,
        name: '2kg Cevapa',
        price: '2.60 BAM',
        status: "pending",
    },
    {
        id: 3,
        name: 'Stolice',
        price: '-',
        status: "success",
    },
]

export default function ShoppingList() {
    return (
        <div className="flex flex-col w-full">

            <div className="bg-light-primary py-4 px-20">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-20 text-xs">
                        <p>Status</p>
                        <p>Name</p>
                    </div>
                    <p className="text-xs mr-20">Price</p>
                </div>

                <div className="relative flex flex-col gap-6 h-[67rem] pr-4 pb-12">
                    {data.map((item) => (
                        <ShoppingItem data={item} key={item.id} />
                    ))}
                </div>

                <form className="flex items-center w-full gap-8 justify-between py-10 border-t border-orange-500 bg-light-primary">
                    <input type="text" placeholder="Add new item" className="w-full p-4 bg-light-primary border-r border-orange-500" />
                    <input type="number" placeholder="Add price" className="w-2/4 p-4 bg-light-primary text-center" />
                    <button className="p-4 rounded-md border border-primary text-primary w-1/3 text-sm">Add</button>
                </form>
            </div>

        </div>
    )
}
