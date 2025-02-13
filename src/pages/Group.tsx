import { Navigate, useParams } from "react-router";
import { useGetGroup } from "../hooks/useGroup";
import ShoppingList from "../components/ShoppingList/ShoppingList";
import useAuthStore from "../stores/authStore";

export default function Group() {
    const { groupId } = useParams();
    const { user } = useAuthStore();
    const { data: groupData, isLoading: isLoadingGroup } = useGetGroup(groupId ?? '');

    if (isLoadingGroup) return <h2>Loading...</h2>;

    if (user?.email && !groupData?.members.includes(user?.email)) return <Navigate to='/shopping-list' />;

    return (
        <div className="flex flex-col lg:flex-row bg-light-primary h-screen pt-24 justify-between">
            <ShoppingList data={groupData} />
        </div>
    )
}
