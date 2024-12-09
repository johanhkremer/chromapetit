'use client'

import { useParams } from 'next/navigation'; // Importera useParams från next/navigation

const ProjectPage = () => {
    const { id } = useParams(); // Hämta parametern "id" från URL:en

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
