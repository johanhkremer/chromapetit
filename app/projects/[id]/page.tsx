import { FC } from 'react';
import { GetServerSideProps } from 'next';
import getProjectById from '@/app/actions/projects/getProjectById';
import ProjectDetail from './components/project-detail';
import Link from 'next/link';
import { Paint, PaintOnProject, Project, ProjectImage } from '@prisma/client'

interface PageProps {
    project: Project & {
        paints: (PaintOnProject & { paint: Paint })[];
        images: ProjectImage[];
    };
}

const ProjectPage: FC<PageProps> = ({ project }) => {
    if (!project) {
        return (
            <section>
                <h1>Project not found</h1>
                <Link href="/projects">Back to projects</Link>
            </section>
        );
    }

    return (
        <article>
            <ProjectDetail project={project} />
        </article>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        if (!params || !params.id) {
            return {
                notFound: true,
            };
        }
        const project = await getProjectById(params.id as string);
        return {
            props: { project },
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        return {
            notFound: true,
        };
    }
};

export default ProjectPage;
