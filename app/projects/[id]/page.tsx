import Project from './components/project';

const ProjectPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params;

    const projectData = await fetch(`http://localhost:3000/api/projects/${id}`, {
        cache: 'no-cache',
    });

    if (!projectData.ok) {
        return (
            <div>
                <h1>Project Page</h1>
                <p>Failed to fetch project.</p>
            </div>
        );
    }

    const paintData = await fetch(`http://localhost:3000/api/paints`, {
        cache: 'no-cache',
    });

    const data = await projectData.json();

    return (
        <div>
            <Project project={data} />
        </div>

    );
};

export default ProjectPage;
