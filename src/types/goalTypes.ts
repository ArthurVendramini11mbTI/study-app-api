import { z } from 'zod'
import type { createGoalSchema } from '../schemas/goalSchema'

export type createGoalInput = z.infer<typeof createGoalSchema> 