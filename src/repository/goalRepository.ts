import { prisma } from "../lib/prisma";
import type { createGoalInput } from '../types/goalTypes'

const goalRepository = {
    create(goalData: createGoalInput){
        return prisma.goals.create({
            data:{
                title: goalData.tittle,
                description: goalData.description,
                user_id: goalData.userId
            }
        })
    }
};

export { goalRepository };