import type { Request, Response } from "express";
import { goalService } from "../services/goal.service";
import { createGoalSchema, goalIdSchema, trackGoalTimeSchema } from '../schemas/goalSchema'
import { userIdSchema } from '../schemas/userSchema'

export const createGoal = async (req: Request, res: Response ) => {    
    const goalData = createGoalSchema.safeParse(req.body)
    const userId = userIdSchema.safeParse(req.userId)

    if (!goalData.success || !userId.success) {
        return res.status(400).json({
            message: "Invalid data",
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
            message: "Invalid data",
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
            message: "Invalid data",
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

export const trackGoalTime = async (req: Request, res: Response) => {
    const userId = userIdSchema.safeParse(req.userId)
    const goalId = goalIdSchema.safeParse(Number(req.params.goalId))
    const trackingData = trackGoalTimeSchema.safeParse(req.body)

    if (!userId.success || !goalId.success || !trackingData.success) {
        return res.status(400).json({
            message: "Invalid data",
            errors: !userId.success
                ? userId.error
                : !goalId.success
                    ? goalId.error
                    : trackingData.error,
        })
    }

    try {
        const trackingResult = await goalService.trackTime(
            goalId.data,
            trackingData.data.action,
            userId.data
        )

        return res.status(200).json(trackingResult)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to track time"
        const status = message === "Goal does not exist" ? 404 : 409

        return res.status(status).json({ message })
    }
}

export const deleteGoal = async (req: Request, res: Response) => {
    const userId = userIdSchema.safeParse(req.userId)
    const goalId = goalIdSchema.safeParse(Number(req.params.goalId))   

    if(!userId.success || !goalId.success){
        return res.status(400).json({
            message: "Invalid data",
            errors: !userId.success ? userId.error : goalId.error,
        });
    }

    const deletedGoal = await goalService.delete(goalId.data, userId.data)

    if(!deletedGoal){
        return res.json({error: 'Invalid Goal'})
    }

    res.status(200).json({status: 'Delete was succesful', data: deletedGoal})
}
