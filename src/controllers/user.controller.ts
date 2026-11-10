import type { Request, Response } from "express";
import { createUserService, getSessionService, loginService } from "../services/user.service";
import { createUserSchema, loginUserSchema } from '../schemas/userSchema'
import { clearAuthCookie, setAuthCookie } from '../lib/authCookie'

export const createUser = async (req: Request, res: Response ) => {    
    const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid data",
            errors: result.error,
        });
    } 

    const { user, token } = await createUserService.create(result.data)
    setAuthCookie(res, token)

    return res.status(201).json({ user })
}

export const login = async (req: Request, res: Response) => {
    const result = loginUserSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid data",
            errors: result.error,
        });
    }

    const { user, token } = await loginService.login(result.data)
    setAuthCookie(res, token)

    return res.status(200).json({ user })
}

export const getSession = async (req: Request, res: Response) => {
    const user = await getSessionService.get(req.userId!)
    return res.status(200).json({ user })
}

export const logout = (_req: Request, res: Response) => {
    clearAuthCookie(res)
    return res.status(204).send()
}
