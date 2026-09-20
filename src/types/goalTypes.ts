import { z } from 'zod'
import type { createGoalSchema, goalIdSchema } from '../schemas/goalSchema'

export type createGoalInput = z.infer<typeof createGoalSchema> 
export type goalIdType = z.infer<typeof goalIdSchema> 

