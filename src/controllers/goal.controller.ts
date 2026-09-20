import type { Request, Response } from "express";
import { goalService } from "../services/goal.service";
import { createGoalSchema, goalIdSchema } from '../schemas/goalSchema'
import { userIdSchema } from '../schemas/userSchema'

export const createGoal = async (req: Request, res: Response ) => {    
    const goalData = createGoalSchema.safeParse(req.body)
    const userId = userIdSchema.safeParse(req.userId)

    if (!goalData.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: goalData.error,
        });
    } 

    const goal = await goalService.create(goalData.data, userId.data)

    return res.status(201).json(goal)
}

export const getGoals = async (req: Request, res: Response ) => {    
    const userId = userIdSchema.safeParse(req.userId)

    const goals = await goalService.get(userId.data)

    return res.status(201).json(goals)
}

export const deleteGoal = async (req: Request, res: Response) => {
    const userId = userIdSchema.safeParse(req.userId)
    const goalId = goalIdSchema.safeParse(Number(req.params.goalId))   

    if(goalId.error){
        return res.status(400).json({
            message: "Dados inválidos",
            errors: goalId.error,
        });
    }

    const deletedGoal = await goalService.delete(goalId.data, userId.data)

    if(!deletedGoal){
        return res.json({erro: 'Invalid Goal'})
    }

    res.status(200).json({status: 'Delete was succesful', data: deletedGoal})
}