import type { Request, Response } from "express";
import { createGoalService } from "../services/goal.service";
import { createGoalSchema } from '../schemas/goalSchema'

export const createGoal = async (req: Request, res: Response ) => {    
    const result = createGoalSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: result.error,
        });
    } 

    const goal = await createGoalService.create(result.data)

    return res.status(201).json(goal)
}
