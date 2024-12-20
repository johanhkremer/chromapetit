import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Project } from "@prisma/client";
import Image from "next/image";

interface ProjectWithImages extends Project {
    images: {
        id: string;
        projectId: string;
        imageUrl: string;
        uploadedAt: Date;
    }[];
}

interface ProjectOverviewProps {
    projects: ProjectWithImages[];
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projects }) => {
    return (
        <section className="pt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle >
                            <CardDescription>{project.description || "No description available"}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-evenly gap-2 mt-2">
                                {project.images.map((image) => (
                                    <Image
                                        key={image.id}
                                        src={image.imageUrl}
                                        alt="Project image"
                                        className="w-20 h-20 object-cover rounded"
                                        placeholder="blur"
                                        blurDataURL={image.imageUrl}
                                        loading="lazy"
                                        width={40}
                                        height={40}
                                        style={{
                                            width: '30%',
                                            height: 'auto',
                                        }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs">
                            <p>{project.createdAt.toDateString()}</p>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p>No projects found.</p>
            )}
        </section>
    );
};

export default ProjectOverview;
