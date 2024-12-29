import React from "react";
import CreateProjectForm from "./components/create-project-form";
import { getPaints } from "@/app/actions/paints/getPaints";
import Toast from "@/components/toast";

const CreateProjectPage = async () => {
    try {
        const allPaints = await getPaints();

        return (
            <div className="container mt-7 sm:w-4/5 md:w-7/10 lg:w-3/5 xl:w-1/2">
                <h1>Create Project</h1>
                <CreateProjectForm allPaints={allPaints} />
            </div>
        );

    } catch (error) {
        console.error(error);

        return (
            <div>
                <h1 className="text-xl font-bold mb-4">Create Project</h1>
                <Toast
                    title="Error"
                    description="Unable to load paints at the moment. Please refresh the page or contact support if the problem persists."
                    variant="destructive"
                />
            </div>
        );
    }
};

export default CreateProjectPage;