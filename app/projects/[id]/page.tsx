import Project from './components/project';
import getProjectById from '@/app/actions/projects/getProjectById';
import { toast } from 'sonner';
import Link from 'next/link';
import { FC } from 'react';

interface PageProps {
    params: { id: string };
}

const ProjectPage: FC<PageProps> = async ({ params }) => {
    try {
        const { id } = await params;

        const project = await getProjectById(id);
        return (
            <article>
                <Project project={project} />
            </article>
        );
    } catch (error) {
        toast.error(`Something went wrong: ${(error as Error).message}`);

        return (
            <section>
                <h1>Project</h1>
                <p>Something went wrong. Please try again later.</p>
                <Link href="/projects" className="hover:text-opacity-50">
                    Back to projects
                </Link>
            </section>
        );
    }
};

export default ProjectPage;
