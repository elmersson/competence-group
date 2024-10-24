import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import { Navigation } from "./_components/navigation"

type Props = {
    children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {
    const user = await onAuthenticatedUser()

    if (user.status === 400) redirect("/callback/sign-in")

    return (
        <div className="flex h-full dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="h-full flex-1 overflow-y-auto">{children}</main>
        </div>
    )
}

export default AuthLayout
