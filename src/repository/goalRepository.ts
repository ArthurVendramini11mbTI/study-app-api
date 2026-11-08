import { prisma } from "../lib/prisma";
import type { createGoalInput, goalIdType } from '../types/goalTypes'
import type { userId,  } from '../types/userTypes'

const goalRepository = {
    create(goalData: createGoalInput, userId: userId){
        return prisma.goals.create({
            data:{
                title: goalData.title,
                description: goalData.description,

                accumulated_seconds: goalData.accumulatedSeconds,
                started_at: goalData.startedAt,
                target_seconds: goalData.targetSeconds,

                color: goalData.color,
                icon: goalData.icon,
                
                user_id: userId
            }
        })
    },

    getGoals(userId: userId){
        return prisma.goals.findMany({
            select: {
                title: true,
                icon: true,
                color: true,
                target_seconds:true, 
                accumulated_seconds: true,
                id: true,
                description: true,
                started_at: true
            },
            where: {user_id: userId}
        })
    },

    findById(goalId: goalIdType, userId: userId){
        return prisma.goals.findUnique({
            where:{
                id: goalId,
                user_id: userId
            }
        })
    },

    startTimeTracking(goalId: goalIdType, userId: userId, startedAt: Date){
        return prisma.goals.update({
            where:{
                id: goalId,
                user_id: userId
            },
            data:{
                started_at: startedAt
            }
        })
    },

    stopTimeTracking(goalId: goalIdType, userId: userId, elapsedSeconds: number){
        return prisma.goals.update({
            where:{
                id: goalId,
                user_id: userId
            },
            data:{
                accumulated_seconds: {
                    increment: elapsedSeconds
                },
                started_at: null
            }
        })
    },

    update(goalId: goalIdType, goalData: createGoalInput, userId: userId){
        return prisma.goals.update({
            where:{
                id: goalId,
                user_id: userId
            },
            data:{
                title: goalData.title,
                description: goalData.description,
                target_seconds: goalData.targetSeconds,
                color: goalData.color,
                icon: goalData.icon
            }
        })
    },

    delete(goalId: goalIdType, userId: userId){
        return prisma.goals.delete({
            where:{
                id: goalId,
                user_id: userId
            }
        })
    }
};


export { goalRepository };
