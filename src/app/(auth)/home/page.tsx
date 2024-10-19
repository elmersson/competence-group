import { SignOutButton, UserButton } from "@clerk/nextjs"

export default async function HomePage() {
    return (
        <>
            <main className="max-w-[75rem] w-full mx-auto">
                <div className="grid grid-cols-[1fr_20.5rem] gap-10 pb-10">
                    <div>
                        <header className="flex items-center justify-between w-full h-16 gap-4">
                            <div className="flex items-center gap-2">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "size-6",
                                        },
                                    }}
                                />
                                <SignOutButton>
                                    <button
                                        type="button"
                                        className="text-sm font-semibold text-white bg-red-500 rounded px-4 py-2"
                                    >
                                        Sign Out
                                    </button>
                                </SignOutButton>
                            </div>
                        </header>
                    </div>
                </div>
            </main>
        </>
    )
}
