import { useState } from "react";
import { useGetGroups } from "../hooks/useGroup";
import AddGroup from "../components/Groups/AddGroup";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import Group from "../components/Groups/Group";
import { FaPlus } from "react-icons/fa";
import Loading from "../components/ui/Loading";

export default function GroupList() {
    const { data: groups, isLoading: isLoadingGroups } = useGetGroups();
    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (isLoadingGroups) return <Loading />

    return (
        <div className="bg-light-primary h-screen pt-28">
            <div className="flex flex-col gap-8 px-6 py-8 md:max-w-[550px] w-full mx-auto md:px-0">
                {groups?.map((group) => (
                    <Group data={group as Group} key={group.id} />
                ))}
            </div>


            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="fixed bottom-10 right-8 p-4 border-2 border-primary rounded-full"><FaPlus className="text-2xl text-primary" /></DialogTrigger>
                <AddGroup setIsOpen={() => setIsOpen(false)} />
            </Dialog>
        </div>
    )
}
