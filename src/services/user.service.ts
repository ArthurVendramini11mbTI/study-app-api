import type { createUserInput, loginUserInput } from "../types/userTypes";
import { userRepository } from '../repository/userRepository'
import bcrypt from "bcryptjs";
import { createAccessToken } from "../lib/jwt";
import { AppError } from '../lib/appError'

function toPublicUser<T extends { password: string }>(user: T) {
  const { password: _password, ...publicUser } = user
  return publicUser
}

const createUserService = {
  async create(userData: createUserInput) {
    const existingUser = await userRepository.findByEmail(userData.email)

    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    let user

    try {
      user = await userRepository.create({
        ...userData,
        password: hashedPassword,
      })
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new AppError(409, "Email is already registered")
      }

      throw error
    }

    const token = await createAccessToken(user.id);

    return {user: toPublicUser(user), token}
  }
};

const loginService = {
  async login(userData: loginUserInput){
    const user = await userRepository.findByEmail(userData.email)

    if(!user){
      throw new AppError(401, "Invalid email or password")
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password)

    if(!passwordMatch){
      throw new AppError(401, "Invalid email or password")
    }

    const token = await createAccessToken(user.id);

    return {user: toPublicUser(user), token}
  }
}

const getSessionService = {
  async get(userId: number) {
    const user = await userRepository.findById(userId)

    if (!user) {
      throw new AppError(401, 'User session is no longer valid')
    }

    return toPublicUser(user)
  }
}

export { createUserService, loginService, getSessionService };
