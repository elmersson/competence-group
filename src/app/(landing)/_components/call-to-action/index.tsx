"use client"

import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "lucide-react"
import Link from "next/link"

const CallToAction = () => {
    return (
        <div className="flex flex-col text-center items-center gap-y-5">
            <GradientText
                className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                element="H1"
            >
                Bringing Competence <br className="md:hidden" /> Together
            </GradientText>
            <p className="text-sm text-center text-muted-foreground">
                The Competence Group platform is here to empower
                <br className="md:hidden" /> knowledge sharing,{" "}
                <br className="hidden md:block" /> collaboration, and cultivate
                all the
                <br className="md:hidden" /> Regent knowledge
            </p>
            <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
                <Link href="https://regent.se/">
                    <Button
                        variant="outline"
                        className="rounded-xl bg-transparent text-base"
                    >
                        Go to Regent
                    </Button>
                </Link>
                <Link href="/sign-in">
                    <Button className="rounded-xl text-base flex gap-2 w-full">
                        <BadgePlus /> Get Started
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction