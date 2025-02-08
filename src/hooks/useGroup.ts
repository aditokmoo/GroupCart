import { addDataToFirestore, getUserGroups, isUserRegistered } from "../lib/utils";
import useAuthStore from "../stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

export const useAddMemberToGroup = (form: UseFormReturn<Group>) => {
    const [member, setMember] = useState<string>("");

    const addMember = async () => {
        if (member) {
            //Checck if user is already added
            const existingMembers = form.getValues('members');
            if (existingMembers.includes(member)) return form.setError("members", { type: "manual", message: "User already added" });

            // Check if user exist
            const userExist = await isUserRegistered("users", "email", member);
            if (!userExist) return form.setError("members", { type: "manual", message: "User does not exist" });

            form.setValue("members", [...form.getValues("members"), member]);
            setMember('');
            form.setError("members", { type: "manual", message: "" });
        }
    };

    return { addMember, member, setMember };
}

export const useAddGroup = (form: UseFormReturn<Group>) => {
    const queryClient = useQueryClient();
    const mutatiton = useMutation({
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

export const useGetGroups = () => {
    const { user } = useAuthStore();

    const query = useQuery({
        queryKey: ['groups', user?.email],
        queryFn: () => {
            if (!user?.email) return Promise.resolve(null);
            return getUserGroups(user.email)
        },
        enabled: !!user?.email
    });

    return query;
}