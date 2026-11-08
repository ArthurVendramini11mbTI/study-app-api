import { z } from 'zod'
import type { createGoalSchema, goalIdSchema, trackGoalTimeSchema } from '../schemas/goalSchema'

export type createGoalInput = z.infer<typeof createGoalSchema> 
export type goalIdType = z.infer<typeof goalIdSchema> 
export type trackGoalTimeInput = z.infer<typeof trackGoalTimeSchema>

