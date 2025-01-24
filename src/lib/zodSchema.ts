import { z } from "zod"

export const authSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6).max(50)
})