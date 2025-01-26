import { useForm } from "react-hook-form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAddMemberToGroup } from "@/hooks/useGroup";

export default function AddGroup() {
    const form = useForm<Group>({
        defaultValues: {
            groupName: "",
            members: [],
        },
    });
    const { member, setMember, addMember } = useAddMemberToGroup(form);

    return (
        <DialogContent className="rounded-lg">
            <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>Enter group name and add members</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => console.log(data))} className="flex flex-col gap-7 pt-12">
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
                                                type="button"
                                                className="absolute right-3 top-3 p-8 text-xs w-36"
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

                        <ul className="list-disc pl-6">
                            {form.getValues("members").map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ul>

                        <button className="bg-primary text-white py-4 rounded-md">Create group</button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    )
}
