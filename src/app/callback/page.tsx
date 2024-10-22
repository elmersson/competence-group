import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function AuthCallback() {
    const user = await currentUser()

    if (!user) {
        redirect("/")
    }

    const loggedInUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
    })

    if (loggedInUser) {
        redirect("/home")
    } else {
        redirect("callback/company-type")
    }
}
