import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getProjects from "../actions/projects/getProjects";
import ProjectOverview from "./components/project-overview";

const ProjectsPage = async () => {
    try {
        const projects = await getProjects();

        if (!projects.data) {
            return (
                <div className="container mt-7 pr-5 sm:w-full md:w-9/10 xl:w-4/5">
                    <h1 className="text-xl font-bold mb-4">All Projects</h1>
                    <p className="text-red-600">No projects found.</p>
                </div>
            );
        }

        return (
            <div className="container mt-7 pr-5 sm:w-full md:w-9/10 xl:w-4/5">
                <h1 className="text-xl font-bold mb-4">All Projects</h1>
                <Link href="/projects/create">
                    <Button>Create Project</Button>
                </Link>
                {projects.success ? (
                    <ProjectOverview projects={projects.data} />
                ) : (
                    <p className="text-red-600">{projects.error}</p>
                )}
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <div className="container mt-7 pr-5 sm:w-full md:w-9/10 xl:w-4/5">
                <h1 className="text-xl font-bold mb-4">All Projects</h1>
                <p className="text-red-600">
                    Something went wrong. Please try again later.
                </p>
            </div>
        );
    }
};

export default ProjectsPage;
