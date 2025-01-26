import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const useAddMemberToGroup = (form: UseFormReturn<Group>) => {
    const [member, setMember] = useState<string>("");

    const addMember = () => {
        if (member) {
            form.setValue("members", [...form.getValues("members"), member]);
            setMember('');
        }
    };

    return { addMember, member, setMember };
}

export const useAddGroup = (form: UseFormReturn<Group>) => {

}