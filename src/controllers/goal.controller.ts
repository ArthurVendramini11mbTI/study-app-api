import type { Request, Response } from "express";
import { goalService } from "../services/goal.service";
import { createGoalSchema, goalIdSchema } from '../schemas/goalSchema'
import { userIdSchema } from '../schemas/userSchema'

export const createGoal = async (req: Request, res: Response ) => {    
    const goalData = createGoalSchema.safeParse(req.body)
    const userId = userIdSchema.safeParse(req.userId)

    if (!goalData.success || !userId.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: !goalData.success ? goalData.error : userId.error,
        });
    } 

    const goal = await goalService.create(goalData.data, userId.data)

    return res.status(201).json(goal)
}

export const getGoals = async (req: Request, res: Response ) => {    
    const userId = userIdSchema.safeParse(req.userId)

    if (!userId.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: userId.error,
        });
    }

    const goals = await goalService.get(userId.data)

    return res.status(201).json(goals)
}

export const updateGoal = async (req: Request, res: Response) => {
    const userId = userIdSchema.safeParse(req.userId)
    const goalId = goalIdSchema.safeParse(Number(req.params.goalId))
    const goalData = createGoalSchema.safeParse(req.body)

    if (!userId.success || !goalId.success || !goalData.success) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: !userId.success
                ? userId.error
                : !goalId.success
                    ? goalId.error
                    : goalData.error,
        });
    }

    const updatedGoal = await goalService.update(goalId.data, goalData.data, userId.data)

    return res.status(200).json(updatedGoal)
}

export const deleteGoal = async (req: Request, res: Response) => {
    const userId = userIdSchema.safeParse(req.userId)
    const goalId = goalIdSchema.safeParse(Number(req.params.goalId))   

    if(!userId.success || !goalId.success){
        return res.status(400).json({
            message: "Dados inválidos",
            errors: !userId.success ? userId.error : goalId.error,
        });
    }

    const deletedGoal = await goalService.delete(goalId.data, userId.data)

    if(!deletedGoal){
        return res.json({erro: 'Invalid Goal'})
    }

    res.status(200).json({status: 'Delete was succesful', data: deletedGoal})
}
