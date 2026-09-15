import type { createGoalInput } from "../types/goalTypes";
import { goalRepository } from '../repository/goalRepository'
import { userRepository } from "../repository/userRepository";

const createGoalService = {
  async create(goalData: createGoalInput) {
    const existingUser = await userRepository.findById(goalData.userId)

    if (!existingUser) {
      throw new Error("Email já cadastrado");
    }

    return await goalRepository.create(goalData)
  }
};


export { createGoalService };