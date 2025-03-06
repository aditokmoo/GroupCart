import { deleteGroup, getGroup, getUserGroups, leaveGroup } from "../services/groupService";
import { addDataToFirestore, isUserRegistered } from "../utils";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useCurrentUser } from "./useAuth";

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
        },
        onError: (error) => {
            console.log('Error creating group: ', error);
        }
    });

    return mutatiton;
}

export const useLeaveGroup = (): UseMutationResult<void, Error, { groupId: string, user: string }> => {
    const queryClient = useQueryClient();
    const mutation = useMutation<void, Error, { groupId: string, user: string }>({
        mutationKey: ['leave_group'],
        mutationFn: ({ groupId, user }: { groupId: string, user: string }) => {
            if (!groupId && !user) throw new Error('Invalid groupId or user');
            return leaveGroup(groupId, user);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
        onError: (error) => {
            console.log('Error leaving group: ', error);
        }
    });

    return mutation
}

export const useDeleteGroup = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();
    const mutation = useMutation<void, Error, string>({
        mutationKey: ['delete_group'],
        mutationFn: (groupId: string) => {
            if (!groupId) throw new Error('Invalid groupId');
            return deleteGroup(groupId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
        },
        onError: (error) => {
            console.log('Error deleting group: ', error);
        }
    });

    return mutation
}

export const useGetGroups = (): UseQueryResult<Group[] | null, Error> => {
    const { data: user } = useCurrentUser();

    const query = useQuery<Group[] | null, Error>({
        queryKey: ['groups', user?.email],
        queryFn: () => {
            if (!user?.email) throw new Error('Invalid user');
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
            if (!groupId) throw new Error('Invalid groupId');
            return getGroup(groupId)
        },
        enabled: !!groupId
    });

    return query;
}