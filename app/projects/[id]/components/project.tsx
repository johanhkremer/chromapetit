'use client'

import ColorCircle from '@/components/ColorCircle';
import { ProjectData, ProjectWithPaintsData } from '@/schemas/CreateProjectSchema';

interface ProjectProps {
    project: ProjectWithPaintsData;
}


const Project = ({ project }: ProjectProps) => {

    return (
        <div>
            <h1>Project Page</h1>
            <p>Project Name: {project.name}</p>
            <p>Project Description: {project.description}</p>
            <div>
                <h2>Paints:</h2>
                <ul>
                    {project.paints.map((paint) => (
                        <li key={paint.id}>
                            <ColorCircle hexCode={paint.hexCode} finish={paint.finish} type={paint.type} size="sm" />
                            {paint.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Project;