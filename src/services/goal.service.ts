import type { createGoalInput } from "../types/goalTypes";
import { goalRepository } from '../repository/goalRepository'
import { userRepository } from "../repository/userRepository";
import type { userId } from "../types/userTypes";

const goalService = {
  async create(goalData: createGoalInput) {
    const existingUser = await userRepository.findById(goalData.userId)

    if (!existingUser) {
      throw new Error("Usuário não existe");
    }

    return await goalRepository.create(goalData)
  },

  async get(userId: userId) {
    return await goalRepository.getGoals(userId)
  }
};

export { goalService }