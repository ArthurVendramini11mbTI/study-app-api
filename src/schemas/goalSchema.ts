import { z } from 'zod'

export const createGoalSchema = z.object({
    tittle: z.string().min(2),
    description: z.string().min(2),
    userId: z.coerce.number().int().nonnegative()
})