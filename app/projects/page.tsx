import React from 'react'
import { auth } from "@/auth"

const ProjectsPage = async () => {
    const session = await auth()

    return (
        <main>
            <h1>Projects Overview</h1>
        </main>
    )
}

export default ProjectsPage