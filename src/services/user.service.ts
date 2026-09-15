import { prisma } from "../lib/prisma";
import type { createUserInput } from "../types/userTypes";

const createUserService = {
  async create(data: createUserInput) {
    const existingUser = await prisma.users.findUnique({ where: { email: data.email }});

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    return await prisma.users.create({ data: {
        name: data.name,
        email: data.email,
        password: data.password
    } });
  }
};

export { createUserService };