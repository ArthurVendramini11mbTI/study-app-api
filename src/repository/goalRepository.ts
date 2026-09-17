import { prisma } from "../lib/prisma";
import type { createGoalInput } from '../types/goalTypes'

const goalRepository = {
    create(goalData: createGoalInput){
        return prisma.goals.create({
            data:{
                title: goalData.tittle,
                description: goalData.description,

                accumulated_seconds: goalData.accumulated_seconds,
                started_at: goalData.startedAt,
                target_seconds: goalData.targetSeconds,

                color: goalData.color,
                icon: goalData.icon,
                
                user_id: goalData.userId
            }
        })
    }
};

export { goalRepository };