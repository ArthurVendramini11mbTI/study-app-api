import type { createUserInput } from "../types/userTypes";
import { userRepository } from '../repository/userRepository'
import bcrypt from "bcryptjs";

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
    const user = await userRepository.findByEmail(userData.email)

    if(!user){
      throw new Error("Email não cadastrado")
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password)

    if(!passwordMatch){
      throw new Error("Senha inválida")
    }

    return user
  }
}

export { createUserService, loginService };