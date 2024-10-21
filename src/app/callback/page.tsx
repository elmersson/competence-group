import { createUserIfNotExists } from "@/actions/auth" // Adjust the import path as needed
import { currentUser } from "@clerk/nextjs/server"
// app/auth/callback/page.tsx
import { redirect } from "next/navigation"

export default async function AuthCallback() {
    const clerk = await currentUser()

    if (!clerk?.id) {
        redirect("/sign-in")
    }

    const { isNewUser } = await createUserIfNotExists(clerk.id)

    if (isNewUser) {
        // Redirect to '/company-type' on first login
        redirect("/home")
    } else {
        // Redirect to home page on subsequent logins
        redirect("/home")
    }

    // You can also add a loading state here if needed
}
