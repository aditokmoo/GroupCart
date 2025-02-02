import { FaPlus } from "react-icons/fa";
import Group from "./Group";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AddGroup from "./AddGroup";
import { useGetGroups } from "../../hooks/useGroup";

export default function GroupList() {
    const { data: groups, isLoading: isLoadingGroups } = useGetGroups();

    if (isLoadingGroups) return <h2>Loading...</h2>

    return (
        <div className="bg-light-primary h-screen pt-28">
            <div className="flex flex-col gap-8 px-6 py-8 md:max-w-[550px] w-full mx-auto md:px-0">
                {groups?.map((group, index) => (
                    <Group data={group} key={index} />
                ))}
            </div>


            <Dialog>
                <DialogTrigger className="fixed bottom-10 right-8 p-4 border-2 border-primary rounded-full"><FaPlus className="text-2xl text-primary" /></DialogTrigger>
                <AddGroup />
            </Dialog>
        </div>
    )
}
