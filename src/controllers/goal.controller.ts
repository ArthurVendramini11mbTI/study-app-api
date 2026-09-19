import type { Request, Response } from "express";
import { goalService } from "../services/goal.service";
import { createGoalSchema } from '../schemas/goalSchema'
import { userIdSchema } from '../schemas/userSchema'

export const createGoal = async (req: Request, res: Response ) => {    
    const result = createGoalSchema.safeParse(req.body)
    const userId = userIdSchema.safeParse(req.userId)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error,
        });
    } 

    const goal = await goalService.create(result.data, userId.data)

    return res.status(201).json(goal)
}

export const getGoals = async (req: Request, res: Response ) => {    
    const result = userIdSchema.safeParse(req.body.userId)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error,
        });
    } 

    const goals = await goalService.get(result.data)

    return res.status(201).json(goals)
}

