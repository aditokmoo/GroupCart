import { UseFormReturn } from "react-hook-form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa";
import { useAddMemberToGroup } from "../../hooks/useGroup";
import { useCurrentUser } from "../../hooks/useAuth";

interface GroupFormProps {
    onSubmit: (data: Group) => void;
    form: UseFormReturn<Group>
    title: string;
    description: string;
    isSubmitting: boolean;
    setIsOpen: () => void;
}

export default function GroupForm({ onSubmit, form, title, description, isSubmitting, setIsOpen }: GroupFormProps) {
    const { data: user } = useCurrentUser();
    const { member, setMember, addMember } = useAddMemberToGroup(form);

    if (isSubmitting) return <p>Loading...</p>;

    return (
        <DialogContent className="rounded-lg">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => { onSubmit(data); setIsOpen(); })} className="flex flex-col gap-7 pt-12">
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
                                <li key={index} className="text-xs py-4 px-6 w-fit border border-gray-200 rounded-full flex items-center gap-2">
                                    {member === user?.email ? "You" : member} <FaCheck className="text-primary" />
                                </li>
                            ))}
                        </ul>

                        <button type="submit" className="bg-primary text-white py-4 rounded-md">{title}</button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    );
}