import { prisma } from "../lib/prisma";
import type { createUserInput } from '../types/userTypes'

const userRepository = {
    findByEmail(userEmail: string){
        return prisma.users.findUnique({
            where: {email: userEmail}
        })
    },

    createUser(userData: createUserInput){
        return prisma.users.create({
            data:{
                email: userData.email,
                password: userData.password,
                name: userData.name,
            }
        })
    }
};

export { userRepository };