import { z } from 'zod'
import type { createUserSchema, userIdSchema } from '../schemas/userSchema'

export type createUserInput = z.infer<typeof createUserSchema>
export type userId = z.infer<typeof userIdSchema>
