import type { createUserInput } from "../types/userTypes";
import { userRepository } from '../repository/userRepository'

const createUserService = {
  async create(userData: createUserInput) {
    const existingUser = await userRepository.findByEmail(userData.email)

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    return await userRepository.create(userData)
  }
};

const loginService = {
  async login(userData: createUserInput){
    const existingUser = await userRepository.findByEmail(userData.email)

    if(!existingUser){
      throw new Error("Email não cadastrado")
    }

    const user = await userRepository.login(userData)

    if(!user){
      throw new Error("Senha inválida")
    }

    return user
  }
}

export { createUserService, loginService };