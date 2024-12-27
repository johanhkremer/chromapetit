import Project from './components/project-detail';
import getProjectById from '@/app/actions/projects/getProjectById';
import { toast } from 'sonner';
import Link from 'next/link';

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
    const { id } = await params;

    if (!id) {
        toast.error("Invalid project ID");

        return (
            <section>
                <h1>Project</h1>
                <p>Invalid project ID. Please try again later.</p>
                <Link href="/projects" className="hover:text-opacity-50">
                    Back to projects
                </Link>
            </section>
        );
    }

    try {
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