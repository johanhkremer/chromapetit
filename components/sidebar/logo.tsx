"use client"

import Link from "next/link"
import { useState } from "react"

export function Logo({
    teams,
}: {
    teams: {
        name: string
        logo: React.ElementType
        plan: string
    }[]
}) {
    //Removed setActiveTeam since only one team is active
    const [activeTeam] = useState(teams[0])

    return (
        <Link href='/'>
            <div className="flex">
                <div className="flex mr-3 aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                        {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
            </div>
        </Link>
    )
}
