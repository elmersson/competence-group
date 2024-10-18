import { ThemeProvider } from "@/components/theme"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Competence",
    description: "Regent Competence Group",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <ClerkProvider
                appearance={{
                    variables: { colorPrimary: "#000000" },
                    elements: {
                        formButtonPrimary:
                            "bg-black border border-black border-solid hover:bg-white hover:text-black",
                        socialButtonsBlockButton:
                            "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
                        socialButtonsBlockButtonText: "font-semibold",
                        formButtonReset:
                            "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
                        membersPageInviteButton:
                            "bg-black border border-black border-solid hover:bg-white hover:text-black",
                        card: "bg-[#fafafa]",
                    },
                }}
            >
                <body className={`${jakarta.className} bg-black min-h-screen`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </ClerkProvider>
        </html>
    )
}
