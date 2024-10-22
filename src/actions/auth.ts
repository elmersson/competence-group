"use server"

import type { CompanyType } from "@/app/callback/company-type/page"
import prisma from "@/lib/prisma"
import { clerkClient } from "@clerk/nextjs/server"

interface createUserProps {
    userId: string
    companyType: CompanyType
}

interface PrismaClientKnownRequestError extends Error {
    code: string
    meta?: { target?: string }
}

export async function createUser({ userId, companyType }: createUserProps) {
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    })

    let isNewUser = false

    if (!user) {
        isNewUser = true

        const clerk = clerkClient()
        const clerkUser = await clerk.users.getUser(userId)

        const firstname = clerkUser.firstName || ""
        const lastname = clerkUser.lastName || ""
        const image = clerkUser.imageUrl || ""

        try {
            const newUser = await prisma.user.create({
                data: {
                    clerkId: userId,
                    firstname,
                    lastname,
                    image,
                    company: {
                        connectOrCreate: {
                            where: {
                                name: companyType,
                            },
                            create: {
                                name: companyType,
                                icon: "",
                            },
                        },
                    },
                },
            })

            return { user: newUser, isNewUser }
        } catch (error: unknown) {
            if (
                isPrismaClientKnownRequestError(error) &&
                error.code === "P2002"
            ) {
                return {
                    error: `User creation failed due to duplicate field: ${error.meta?.target}`,
                    isNewUser: false,
                }
            }
            throw error
        }
    }

    return { user, isNewUser }
}

function isPrismaClientKnownRequestError(
    error: unknown,
): error is PrismaClientKnownRequestError {
    return typeof error === "object" && error !== null && "code" in error
}
