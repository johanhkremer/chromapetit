import React from "react";
import CreateProjectForm from "./components/CreateProjectForm";
import { CreateProjectData } from "@/schemas/CreateProjectSchema";

interface CreateProjectFormProp {
    onSubmit: (data: CreateProjectData) => void
}

const CreateProjectPage: React.FC<CreateProjectFormProp> = async ({ onSubmit: data }) => {

    console.log(data)

    return (
        <main className="container">
            <h1>Create Project</h1>
            <CreateProjectForm />
        </main>
    );
};

export default CreateProjectPage;
