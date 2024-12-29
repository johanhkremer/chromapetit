"use client"

import Link from "next/link"
import { Brush } from "lucide-react"
import { DarkMode } from "../dark-mode-switch"

export function Logo() {
    return (
        <>
            <Link href='/'>
                <div className="flex">
                    <div className="flex mr-3 aspect-square size-8 items-center justify-center rounded-md  bg-argon-gradient p-0.5">
                        <div className="flex h-full w-full items-center justify-center rounded-md bg-primary-foreground back">
                            <Brush className="text-argon-gradient rounded-md" />
                        </div>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            ChromaPetit
                        </span>
                        <span className="truncate text-xs">
                            Miniature painting
                        </span>
                    </div>
                </div>
            </Link>
            <div className="pt-3">
                <DarkMode />
            </div>
        </>
    )
}