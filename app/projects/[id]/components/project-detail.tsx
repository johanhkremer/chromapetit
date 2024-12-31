'use client'

import ColorCircle from '@/components/color-circle';
import Image from 'next/image';
import { Paint, PaintOnProject, Project, ProjectImage } from '@prisma/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DeleteImageButton from '@/components/delete-image-button';
import { useState } from 'react';

interface ProjectProps {
    project: Project & {
        paints: (PaintOnProject & { paint: Paint })[];
        images: ProjectImage[];
    };
}

const ProjectDetail = ({ project }: ProjectProps) => {
    const [images, setImages] = useState<ProjectImage[]>(project.images);

    const handleDelete = (deletedImageId: string) => {
        setImages(prevImages => prevImages.filter(image => image.id !== deletedImageId));
    };

    return (
        <section className='mt-4'>
            <h1>Project Details</h1>
            <Card>
                <CardHeader>
                    <CardTitle><span className='text-2xl'>{project.name}</span></CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <h3>Paints:</h3>
                        <ul>
                            {project.paints.map((paint) => (
                                <li key={paint.id} className="mb-3">
                                    <Card className="flex items-center w-full p-2 bg-gray-100">
                                        <div className="flex-shrink-0">
                                            <ColorCircle hexCode={paint.paint.hexCode} size="sm" />
                                        </div>
                                        <div className="flex-1 text-center">
                                            <span>{paint.paint.name} - {paint.paint.brand}</span>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Images:</h3>
                        <ul>
                            {images.map((image) => (
                                <li key={image.id} className="relative group w-fit">
                                    <Image
                                        src={image.imageUrl}
                                        alt="Project Image"
                                        width={300}
                                        height={300}
                                        className="w-full rounded-md border border-gray-300"
                                    />
                                    <div className='absolute top-0 right-0'>
                                        <DeleteImageButton
                                            onDelete={() => handleDelete(image.id)}
                                            imageUrl={image.imageUrl}
                                            imageId={image.id}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default ProjectDetail;