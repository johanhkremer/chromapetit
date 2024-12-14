import React from "react";
import CreateProjectForm from "./components/CreateProjectForm";


const CreateProjectPage = () => {

    return (
        <div className="container mt-7 pr-7 sm:w-4/5 md:w-7/10 lg:w-3/5 xl:w-1/2">
            <h1>Create Project</h1>
            <CreateProjectForm />
        </div>
    );
};

export default CreateProjectPage;
