"use server"

import { client } from "@/lib/prisma"
import { clerkClient } from "@clerk/nextjs/server"

export async function createUserIfNotExists(userId: string) {
    let user = await client.user.findUnique({
        where: { clerkId: userId },
    })

    let isNewUser = false

    if (!user) {
        isNewUser = true

        const clerkUser = await clerkClient.users.getUser(userId)

        const firstname = clerkUser.firstName || ""
        const lastname = clerkUser.lastName || ""
        const image = clerkUser.imageUrl || ""

        user = await client.user.create({
            data: {
                clerkId: userId,
                firstname,
                lastname,
                image,
                company: "SOLUTIONS",
            },
        })
    }

    return { user, isNewUser }
}
