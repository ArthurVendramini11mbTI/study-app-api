import { z } from 'zod'

export const createGoalSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(2),

    accumulatedSeconds: z.int(),
    startedAt: z.date().nullable(),
    targetSeconds: z.number().int().positive(),

    color: z.string().length(6),
    icon: z.string(),

    userId: z.coerce.number().int().nonnegative()
})