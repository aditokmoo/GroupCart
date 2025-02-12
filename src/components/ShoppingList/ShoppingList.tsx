
import ShoppingItem from "./ShoppingItem";
import { useAddShoppingItem } from "../../hooks/useShoppingList";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useForm } from "react-hook-form";
import useAuthStore from "../../stores/authStore";

export default function ShoppingList({ data }: { data?: Group | null }) {
    const { user } = useAuthStore();
    const form = useForm<ShoppingItem>({
        defaultValues: {
            name: '',
            price: 0,
            addedBy: user?.displayName ?? '',
            status: 'pending',
        }
    })
    const { mutate: addShoppingItem, isPending: isAddingShoppingItem } = useAddShoppingItem();

    if (isAddingShoppingItem) return <h2>Loading...</h2>

    if (!data) return <h2>Loading...</h2>;
    console.log(data)


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
                    {data?.groupList.map((item) => (
                        <ShoppingItem data={item} key={item.id} />
                    ))}
                </div>

                <form className="flex items-center w-full gap-8 justify-between py-10 text-sm bg-light-primary">
                    <input {...form.register('name')} name="name" type="text" placeholder="Add new item" className="w-full p-4 bg-light-primary border-b border-primary" />
                    <input {...form.register('price')} name="price" type="number" placeholder="Add price" className="w-2/4 p-4 bg-light-primary text-center border-b border-primary" />
                    <button className="p-4 rounded-md border border-primary text-primary w-1/3 text-sm" onClick={form.handleSubmit((data) => addShoppingItem(data as ShoppingItem))}>Add</button>
                    <button className="p-4 rounded-md border border-primary text-primary text-lg"><MdOutlineCameraAlt /></button>
                </form>
            </div>

        </div>
    )
}
