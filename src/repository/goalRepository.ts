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
                description: true
            },
            where: {user_id: userId}
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