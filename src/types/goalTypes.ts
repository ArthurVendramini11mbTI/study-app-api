import { z } from 'zod'
import type { createGoalSchema } from '../schemas/goalSchema'

export type createUserInput = z.infer<typeof createGoalSchema> 