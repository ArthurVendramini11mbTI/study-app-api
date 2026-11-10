import { z } from 'zod'

const emailSchema = z.string().trim().toLowerCase().max(254).pipe(z.email())

export const createUserSchema = z.object({
    email: emailSchema,
    password: z.string().min(8).max(72)
})

export const loginUserSchema = z.object({
    email: emailSchema,
    password: z.string().min(1).max(72)
})

export const userIdSchema = z.int().min(1)
