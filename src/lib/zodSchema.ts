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