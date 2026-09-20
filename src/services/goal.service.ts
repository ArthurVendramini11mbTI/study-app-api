import type { createGoalInput, goalIdType } from "../types/goalTypes";
import { goalRepository } from '../repository/goalRepository'
import { userRepository } from "../repository/userRepository";
import type { userId } from "../types/userTypes";

const goalService = {
  async create(goalData: createGoalInput, userId: userId) {
    const existingUser = await userRepository.findById(userId)

    if (!existingUser) {
      throw new Error("Usuário não existe");
    }

    return await goalRepository.create(goalData, userId)
  },

  async get(userId: userId) {
    return await goalRepository.getGoals(userId)
  },

  async delete(goalId: goalIdType, userId: userId) {
    const deleteGoal = await goalRepository.delete(goalId, userId)

    if(!deleteGoal){
      throw new Error("Goal não existe");
    }

    return deleteGoal
  }
};

export { goalService }