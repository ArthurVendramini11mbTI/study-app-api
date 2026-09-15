import type { Request, Response } from "express";

export const createUser = (req: Request, res: Response ) => {
    res.json({status: 'certo'})
}