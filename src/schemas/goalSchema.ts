import { z } from 'zod'

export const createGoalSchema = z.object({
    tittle: z.string().min(2),
    description: z.string().min(2),

    accumulated_seconds: z.int(),
    startedAt: z.date(),
    targetSeconds: z.int(),

    color: z.string().length(6),
    icon: z.string(),

    userId: z.coerce.number().int().nonnegative()
})