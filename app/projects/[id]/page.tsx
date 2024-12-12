'use client'

import { useParams } from 'next/navigation';

const ProjectPage = () => {
    const { id } = useParams();

    if (!id) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Project ID: {id}</h1>
        </div>
    );
};

export default ProjectPage;
