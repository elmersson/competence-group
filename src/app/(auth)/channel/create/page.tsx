import { onAuthenticatedUser } from "@/actions/auth"
import CreateGroup from "@/components/forms"

import { redirect } from "next/navigation"

const GroupCreatePage = async () => {
    const user = await onAuthenticatedUser()

    if (!user || !user.id) redirect("/sign-in")

    return (
        <>
            <div className="px-7 flex flex-col">
                <h5 className="font-bold text-base text-themeTextWhite">
                    Create a Channel
                </h5>
                <p className="text-themeTextGray leading-tight">
                    For whatever you think is neccessary
                </p>
            </div>
            <CreateGroup userId={user.id} />
        </>
    )
}

export default GroupCreatePage
