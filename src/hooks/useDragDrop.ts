import { db } from "../lib/firebase.config";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";

export default function useDragDrop(groupId: string) {
    const queryClient = useQueryClient();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        queryClient.setQueryData(['group', groupId], (oldData: Group) => {
            if (!oldData) return oldData;

            const oldIndex = oldData.groupList.findIndex((item) => item.order === active.id);
            const newIndex = oldData.groupList.findIndex((item) => item.order === over.id);

            if (oldIndex === -1 || newIndex === -1) return oldData;

            const updatedList = arrayMove(oldData.groupList, oldIndex, newIndex)
                .map((item, index) => ({ ...item, order: index + 1 }));

            updateGroupListOrder(groupId, updatedList)

            return { ...oldData, groupList: updatedList };
        })
    }

    return { handleDragEnd }
}

async function updateGroupListOrder(groupId: string, updatedList: ShoppingItem[]) {
    const groupRef = doc(db, "groups", groupId);

    try {
        await updateDoc(groupRef, {
            groupList: updatedList,
        });
    } catch (error) {
        console.error("Error updating order:", error);
    }
}