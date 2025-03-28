import { useForm } from "react-hook-form";
import { useAddGroup } from "../../hooks/useGroup";
import { useCurrentUser } from "../../hooks/useAuth";
import Loading from "../ui/Loading";
import GroupForm from "./GroupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "../../lib/zodSchema";

export default function AddGroup({ setIsOpen }: { setIsOpen: () => void }) {
    const { data: user } = useCurrentUser();

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
            title="Create Group"
            description="Enter group name and add members"
            form={form}
            onSubmit={createGroup}
            isSubmitting={isCreatingGroup}
            setIsOpen={setIsOpen}
        />
    );
}