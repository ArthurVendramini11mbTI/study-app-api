import { z } from 'zod'

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const userId = z.int().min(1)