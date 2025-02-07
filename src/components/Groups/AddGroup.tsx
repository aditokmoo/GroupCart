import { useForm } from "react-hook-form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAddGroup, useAddMemberToGroup } from "../../hooks/useGroup";
import { FaCheck } from "react-icons/fa";
import useAuthStore from "../../stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "../../lib/zodSchema";

export default function AddGroup({ setIsOpen }: { setIsOpen: () => void }) {
    const { user } = useAuthStore();
    const form = useForm<Group>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            groupName: "",
            createdBy: user?.email ? user.email : "",
            members: user?.email ? [user.email] : [],
            groupList: [],
        },
    });
    const { member, setMember, addMember } = useAddMemberToGroup(form);
    const { mutate: createGroup, isPending: isCreatingGroup } = useAddGroup(form);

    if (isCreatingGroup) return <h2>Loading...</h2>

    return (
        <DialogContent className="rounded-lg">
            <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>Enter group name and add members</DialogDescription>
                <Form {...form}>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-7 pt-12">
                        <FormField
                            control={form.control}
                            name="groupName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" className="text-xs" placeholder="Enter group name..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="members"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                className="pr-48 text-xs"
                                                placeholder="Add members by passing their email"
                                                value={member}
                                                onChange={(e) => setMember(e.target.value)}
                                            />
                                            <Button
                                                type="submit"
                                                className="absolute right-2 md:right-3 top-2 md:top-3 p-8 text-xs w-36"
                                                onClick={addMember}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <span className="px-2">Added Members: {form.getValues("members").length}</span>
                        <ul className="list-none flex flex-wrap gap-4 mb-16 items-center md:items-start">
                            {form.getValues("members").map((member, index) => (
                                <li key={index} className="text-xs py-4 px-6 w-fit border border-gray-200 rounded-full flex items-center gap-2">{member === user?.email ? "You" : member} <FaCheck className="text-primary" /> </li>
                            ))}
                        </ul>

                        <button onClick={form.handleSubmit((data) => { createGroup(data); setIsOpen() })} className="bg-primary text-white py-4 rounded-md">Create group</button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    )
}
