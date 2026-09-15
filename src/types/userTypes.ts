import { z } from 'zod'
import type { createUserSchema } from '../schemas/userSchema'

export type createUserInput = z.infer<typeof createUserSchema> 