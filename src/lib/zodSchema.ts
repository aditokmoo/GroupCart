import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6).max(50)
})

export const registerSchema = z.object({
    username: z.string().min(3).max(25),
    email: z.string().email('Invalid email'),
    password: z.string().min(6).max(50)
})

export const groupSchema = z.object({
    groupName: z.string()
        .min(3, { message: "Group name must have at least 3 characters." })
        .max(25, { message: "Group name cannot exceed 25 characters." }),
    members: z.array(z.string()),
    createdBy: z.string(),
    groupList: z.array(z.object({ addedBy: z.string(), item: z.string() })),
})