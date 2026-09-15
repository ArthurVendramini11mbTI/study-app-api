import type { Request, Response } from "express";
import { createUserService } from "../services/user.service";
import type { createUserInput } from "../types/userTypes";

export const createUser = async (req: Request, res: Response ) => {
    const createUserData: createUserInput = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }

    const user = await createUserService.create(createUserData)

    return res.status(201).json(user)
}