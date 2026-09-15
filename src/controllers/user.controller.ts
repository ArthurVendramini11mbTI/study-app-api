import type { Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { createUserSchema } from '../schemas/userSchema'

export const createUser = async (req: Request, res: Response ) => {    
    const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error,
        });
    }

    const user = await createUserService.create(result.data)

    return res.status(201).json(user)
}