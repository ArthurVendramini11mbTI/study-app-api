import { z } from 'zod'
import type { createUserSchema, loginUserSchema, userIdSchema } from '../schemas/userSchema'

export type createUserInput = z.infer<typeof createUserSchema>
export type loginUserInput = z.infer<typeof loginUserSchema>
export type userId = z.infer<typeof userIdSchema>
