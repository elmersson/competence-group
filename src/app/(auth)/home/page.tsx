import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export default async function HomePage() {
    const user = await currentUser()

    if (!user) {
        return null
    }

    const loggedInUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
    })

    if (!loggedInUser) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                firstname: user.firstName ?? "",
                lastname: user.lastName ?? "",
                company: {
                    create: {
                        name: "SOLUTIONS",
                        icon: "",
                    },
                },
            },
        })
    }

    return <div>Home</div>
}
