import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useAddShoppingItem } from "../../hooks/useShoppingList";
import useAuthStore from "../../stores/authStore";
import { MdOutlineCameraAlt } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { shoppingListSchema } from "../../lib/zodSchema";
import { Input } from "../ui/input";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";


export default function ShoppingForm() {
    const { user } = useAuthStore();
    const form = useForm<ShoppingItem>({
        resolver: zodResolver(shoppingListSchema),
        defaultValues: {
            name: '',
            price: 0,
            addedBy: user?.displayName ?? '',
            status: 'pending',
        }
    })
    const { mutate: addShoppingItem, isPending: isAddingShoppingItem } = useAddShoppingItem();

    return (
        <Form {...form}>
            <form className="flex items-center w-full gap-8 justify-between py-10 text-sm bg-light-primary">
                <div className="w-full">
                    <Controller
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" placeholder="Add new item" {...field} className={`border ${form.formState.errors.name ? 'border-red-700' : 'border-transparent'}`} />
                                </FormControl>
                                {form.formState.errors.name && (
                                    <FormMessage>{ }</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-1/4">
                    <Controller
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" placeholder="0.00" {...field} className={`text-center border ${form.formState.errors.price ? 'border-red-700' : 'border-transparent'}`} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex items-center gap-4 w-1/2">
                    <Button size="lg" className="rounded-md border border-primary text-xs text-white w-full" onClick={form.handleSubmit((data) => addShoppingItem(data as ShoppingItem))} disabled={isAddingShoppingItem}>{isAddingShoppingItem ? <Loader2 className="animate-spin" /> : 'Add'}</Button>
                    <button className="p-4 rounded-md border border-primary text-primary text-lg"><MdOutlineCameraAlt /></button>
                </div>
            </form>
        </Form>
    )
}
