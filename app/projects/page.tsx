import React from 'react'
import { auth } from "@/auth"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ProjectsPage = async () => {
    const session = await auth()

    return (
        <main>
            <h1>Projects Overview</h1>
            <Button><Link href="/projects/create">Create</Link></Button>
        </main>
    )
}

export default ProjectsPage