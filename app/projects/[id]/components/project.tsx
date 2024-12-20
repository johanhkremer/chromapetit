'use client'

import ColorCircle from '@/components/ColorCircle';
import Image from 'next/image';
import { Paint, PaintOnProject, Project, ProjectImage } from '@prisma/client'

interface ProjectProps {
    project: Project & {
        paints: (PaintOnProject & { paint: Paint })[];
        images: ProjectImage[];
    };
}

const ProjectById = ({ project }: ProjectProps) => {

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
                            <ColorCircle hexCode={paint.paint.hexCode} finish={paint.paint.finish} type={paint.paint.type} size="sm" />
                            {paint.paint.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Images:</h2>
                <ul>
                    {project.images.map((image) => (
                        <li key={image.id}>
                            <Image
                                src={image.imageUrl}
                                alt="Project Image"
                                width={500}
                                height={300}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectById;