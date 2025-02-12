import { useParams } from "react-router";
import { addItemToGroup } from "../services/shoppingListServices";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"

export const useAddShoppingItem = (): UseMutationResult<void, Error, ShoppingItem> => {
    const queryClient = useQueryClient();
    const { groupId } = useParams();
    const mutation = useMutation<void, Error, ShoppingItem>({
        mutationKey: ['addItemToGroup'],
        mutationFn: (data: ShoppingItem) => addItemToGroup(groupId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['group'] });
        }
    })

    return mutation;
}