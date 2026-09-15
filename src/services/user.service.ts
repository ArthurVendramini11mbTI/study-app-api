import { prisma } from "../lib/prisma";
import type { createUserInput } from "../types/userTypes";
import { userRepository } from '../repository/userRepository'

const createUserService = {
  async create(userData: createUserInput) {
    const existingUser = await userRepository.findByEmail(userData.email)

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    return await userRepository.createUser(userData)
  }
};

export { createUserService };