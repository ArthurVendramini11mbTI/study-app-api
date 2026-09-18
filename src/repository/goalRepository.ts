import { prisma } from "../lib/prisma";
import type { createGoalInput } from '../types/goalTypes'
import type { userId } from '../types/userTypes'

const goalRepository = {
    create(goalData: createGoalInput){
        return prisma.goals.create({
            data:{
                title: goalData.title,
                description: goalData.description,

                accumulated_seconds: goalData.accumulatedSeconds,
                started_at: goalData.startedAt,
                target_seconds: goalData.targetSeconds,

                color: goalData.color,
                icon: goalData.icon,
                
                user_id: goalData.userId
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
                accumulated_seconds: true
            },
            where: {user_id: userId}
        })
    }
};


export { goalRepository };