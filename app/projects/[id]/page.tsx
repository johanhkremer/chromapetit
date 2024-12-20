import { get } from 'lodash';
import Project from './components/project';
import getProjectById from '@/app/actions/projects/getProjectById';

const ProjectPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params;
    try {
        const project = await getProjectById(id);
        return <Project project={project} />;

    } catch (error) {
        return <div>{get(error, 'message', 'An unknown error occurred')}</div>;

    }
};

export default ProjectPage;
