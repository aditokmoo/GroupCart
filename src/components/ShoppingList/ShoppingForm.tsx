import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useAddShoppingItem } from "../../hooks/useShoppingList";
import useAuthStore from "../../stores/authStore";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { shoppingListSchema } from "../../lib/zodSchema";
import { Input } from "../ui/input";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";


export default function ShoppingForm({ toggle }: { toggle: (val: string) => void }) {
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
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Item</DialogTitle>
                <DialogDescription>Add new item to your shopping list</DialogDescription>
                <Form {...form}>
                    <form className="flex flex-col items-center w-full gap-8 justify-between py-10 text-sm">
                        <div className="w-full">
                            <Controller
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" placeholder="Add new item" {...field} className={`text-center border ${form.formState.errors.name ? 'border-red-700' : 'border-transparent'}`} />
                                        </FormControl>
                                        {form.formState.errors.name && (
                                            <FormMessage>{ }</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
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

                        <Button size="lg" className="rounded-md border border-primary text-xs text-white w-full" onClick={form.handleSubmit((data) => { addShoppingItem(data as ShoppingItem); toggle('NewItemForm') })} disabled={isAddingShoppingItem}>{isAddingShoppingItem ? <Loader2 className="animate-spin" /> : 'Add'}</Button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    )
}
