"use client"

import { createUser } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

export enum CompanyType {
    CONSULTING = "CONSULTING",
    DEVOTION = "DEVOTION",
    QUALITY = "QUALITY",
    SECURITY = "SECURITY",
    SOLUTIONS = "SOLUTIONS",
}

const formSchema = z.object({
    companyType: z.nativeEnum(CompanyType, {
        errorMap: () => ({ message: "You must select a company type" }),
    }),
})

type FormSchema = z.infer<typeof formSchema>

export default function CompanyPage() {
    const { user } = useUser()

    const {
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })

    if (!user) {
        return null
    }

    const onSubmit = async (data: FormSchema) => {
        console.log("Form Submitted:", data)

        try {
            const response = await createUser({
                userId: user.id,
                companyType: data.companyType,
            })

            console.log("User created or fetched:", response)
            redirect("/home")
        } catch (error) {
            console.error("Error creating user:", error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div className="mb-4">
                    <Select
                        onValueChange={(value) =>
                            setValue("companyType", value as CompanyType)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Company Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={CompanyType.CONSULTING}>
                                Consulting
                            </SelectItem>
                            <SelectItem value={CompanyType.DEVOTION}>
                                Devotion
                            </SelectItem>
                            <SelectItem value={CompanyType.QUALITY}>
                                Quality
                            </SelectItem>
                            <SelectItem value={CompanyType.SECURITY}>
                                Security
                            </SelectItem>
                            <SelectItem value={CompanyType.SOLUTIONS}>
                                Solutions
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {errors.companyType && (
                    <p className="text-red-500">{errors.companyType.message}</p>
                )}

                <Button type="submit" className="mt-4">
                    Submit
                </Button>
            </form>
        </div>
    )
}
