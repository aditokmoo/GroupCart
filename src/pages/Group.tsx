import { useParams } from "react-router";
import { useGetGroup } from "../hooks/useGroup";
import ShoppingList from "../components/ShoppingList/ShoppingList";
import AIOutput from "../components/AISuggestions/AIOutput";

export default function Group() {
    const { groupId } = useParams();
    const { data: groupData, isLoading: isLoadingGroup } = useGetGroup(groupId!);

    if (isLoadingGroup) return <h2>Loading...</h2>;

    console.log(groupData)

    return (
        <div className="bg-light-primary h-screen pt-24 flex justify-between">
            <ShoppingList />
            <AIOutput />
        </div>
    )
}
