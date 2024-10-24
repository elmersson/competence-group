"use client"

import { Button } from "@/components/ui/button"
import { Home } from "@/icons"
import { cn } from "@/lib/utils"
import { ChevronsLeft, MenuIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { type ElementRef, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { UserItem } from "./user-item"

export const Navigation = () => {
    const isMobile = useMediaQuery("(max-width: 768px)")

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return
        let newWidth = event.clientX

        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`,
            )
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)",
            )
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px",
            )
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile])

    return (
        <>
            <aside
                className={cn(
                    "group/sidebar h-full dark:bg-neutral-900 bg-neutral-100 overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0",
                )}
                ref={sidebarRef}
            >
                <button
                    type="button"
                    onClick={collapse}
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </button>
                <div>
                    <UserItem />
                </div>
                <div>
                    <Link href="/home" className="hidden md:inline">
                        <Button
                            variant="ghost"
                            className="flex gap-4 w-full justify-start hover:bg-themeGray items-center text-sm text-themeTextGray"
                        >
                            Home
                            <Home />
                        </Button>
                    </Link>

                    <Link href="/channel/create" className="hidden md:inline">
                        <Button
                            variant="ghost"
                            className="flex gap-4 w-full justify-start hover:bg-themeGray items-center text-sm text-themeTextGray"
                        >
                            Create Channel
                            <PlusIcon />
                        </Button>
                    </Link>
                </div>
                <div
                    className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full",
                )}
            >
                <nav className="w-full bg-transparent px-3 py-2">
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
            </div>
        </>
    )
}
