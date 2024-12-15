import React from "react";
import CreateProjectForm from "./components/CreateProjectForm";
import { Paint } from '@/schemas/PaintSchema';

interface PaintResponse {
    paints: Paint[];
    totalPaints: number;
    pageSize: number;
    page: number;
}

const CreateProjectPage = async () => {

    const res = await fetch(`http://localhost:3000/api/paints`, {
        cache: 'no-cache',
    });

    if (!res.ok) {
        return (
            <div>
                <h1>All Paints Page</h1>
                <p>Failed to fetch paints.</p>
            </div>
        );
    }

    const {
        paints: allPaints,
    }: PaintResponse = await res.json();

    return (
        <div className="container mt-7 pr-7 sm:w-4/5 md:w-7/10 lg:w-3/5 xl:w-1/2">
            <h1>Create Project</h1>
            <CreateProjectForm allPaints={allPaints} />
        </div>
    );
};

export default CreateProjectPage;
