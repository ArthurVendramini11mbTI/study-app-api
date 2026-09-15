import type { Request, Response } from "express";
import { createUserService, loginService } from "../services/user.service";
import { createUserSchema } from '../schemas/userSchema'
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response ) => {    
    const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error,
        });
    } 

    const validCreateUserInput = {
        email: result.data.email, 
        password: bcrypt.hashSync(result.data.password ,10)
    }

    const user = await createUserService.create(validCreateUserInput)

    return res.status(201).json(user)
}

export const login = async (req: Request, res: Response) => {
    const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error,
        });
    }

    const user = await loginService.login(result.data)

    return res.status(201).json(user)
}