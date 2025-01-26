import { FaPlus } from "react-icons/fa";
import Group from "./Group";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AddGroup from "./AddGroup";

export default function GroupList() {

    return (
        <>
            <div className="flex flex-col gap-8 mt-28 px-6 py-8 md:max-w-[550px] w-full mx-auto md:px-0">
                {[1, 2, 3].map((data) => (
                    <Group data={data} key={data} />
                ))}
            </div>


            <Dialog>
                <DialogTrigger className="fixed bottom-10 right-8 p-4 border-2 border-primary rounded-full"><FaPlus className="text-2xl text-primary" /></DialogTrigger>
                <AddGroup />
            </Dialog>
        </>
    )
}
