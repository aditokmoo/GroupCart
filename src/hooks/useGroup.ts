import { addDataToFirestore, getGroup, getUserGroups, isUserRegistered } from "../lib/utils";
import useAuthStore from "../stores/authStore";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

export const useAddMemberToGroup = (form: UseFormReturn<Group>): { addMember: () => Promise<void>, member: string, setMember: React.Dispatch<React.SetStateAction<string>> } => {
    const [member, setMember] = useState<string>("");

    const addMember = async () => {
        if (member) {
            const existingMembers = form.getValues('members');
            if (existingMembers.includes(member)) return form.setError("members", { type: "manual", message: "User already added" });

            const userExist = await isUserRegistered("users", "email", member);
            if (!userExist) return form.setError("members", { type: "manual", message: "User does not exist" });

            form.setValue("members", [...form.getValues("members"), member]);
            setMember('');
            form.setError("members", { type: "manual", message: "" });
        }
    };

    return { addMember, member, setMember };
}

export const useAddGroup = (form: UseFormReturn<Group>): UseMutationResult<void, Error, Group> => {
    const queryClient = useQueryClient();
    const mutatiton = useMutation<void, Error, Group>({
        mutationKey: ['createGroup'],
        mutationFn: ({ groupName, createdBy, members, groupList }: Group) => {
            const groupId = uuidv4();
            return addDataToFirestore("groups", groupId, { groupName, members, createdBy, groupList });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            form.reset();
        }
    });

    return mutatiton;
}

export const useGetGroups = (): UseQueryResult<Group[] | null, Error> => {
    const { user } = useAuthStore();

    const query = useQuery<Group[] | null, Error>({
        queryKey: ['groups', user?.email],
        queryFn: () => {
            if (!user?.email) return Promise.resolve(null);
            return getUserGroups('members', user.email)
        },
        enabled: !!user?.email
    });

    return query;
}

export const useGetGroup = (groupId: string): UseQueryResult<Group | null, Error> => {
    const query = useQuery<Group | null, Error>({
        queryKey: ['group', groupId],
        queryFn: () => {
            if (!groupId) return Promise.resolve(null);
            return getGroup(groupId)
        },
        enabled: !!groupId
    });

    return query;
}