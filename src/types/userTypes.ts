import { z } from 'zod'
import type { createUserSchema, loginUserSchema, themePaletteSchema, userIdSchema } from '../schemas/userSchema'

export type createUserInput = z.infer<typeof createUserSchema>
export type loginUserInput = z.infer<typeof loginUserSchema>
export type themePalette = z.infer<typeof themePaletteSchema>
export type userId = z.infer<typeof userIdSchema>
