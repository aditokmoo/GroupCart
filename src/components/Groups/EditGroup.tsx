import { useForm } from "react-hook-form";
import { useAddGroup } from "../../hooks/useGroup";
import { useCurrentUser } from "../../hooks/useAuth";
import Loading from "../ui/Loading";
import GroupForm from "./GroupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "../../lib/zodSchema";

export default function EditGroup({ setIsOpen, selectedGroup }: { setIsOpen: () => void, selectedGroup: Group }) {
    const { data: user } = useCurrentUser();
    console.log(selectedGroup)
    const form = useForm<Group>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            groupName: "",
            createdBy: user?.email || "",
            members: user?.email ? [user.email] : [],
            groupList: [],
        },
    });

    const { mutate: createGroup, isPending: isCreatingGroup } = useAddGroup(form);

    if (isCreatingGroup) return <Loading />;

    return (
        <GroupForm
            title="Edit Group"
            description="Edit group name and add or remove members"
            form={form}
            onSubmit={createGroup}
            isSubmitting={isCreatingGroup}
            setIsOpen={setIsOpen}
        />
    );
}