import { prisma } from "../lib/prisma";
import type { createUserInput } from '../types/userTypes'

const userRepository = {
    findByEmail(userEmail: string){
        return prisma.users.findUnique({
            where: {email: userEmail}
        })
    },

    create(userData: createUserInput){
        return prisma.users.create({
            data:{
                email: userData.email,
                password: userData.password
            }
        })
    },

    login(userData: createUserInput){
        return prisma.users.findUnique({
            where: {email: userData.email, password: userData.password}
        })
    }
};

export { userRepository };