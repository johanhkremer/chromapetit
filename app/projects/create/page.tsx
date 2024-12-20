import React from "react";
import CreateProjectForm from "./components/CreateProjectForm";
import { getPaints } from "@/app/actions/paints/getPaints";
import Toast from "@/components/toast";

const CreateProjectPage = async () => {
    console.log("API key:", process.env.MY_API_KEY, "Auth domain", process.env.MY_AUTH_DOMAIN, "Project ID:", process.env.MY_PROJECT_ID, "Storage bucket:", process.env.MY_STORAGE_BUCKET, "Messaging sender ID:", process.env.MY_MESSAGING_SENDER_ID, "App ID:", process.env.MY_APP_ID, "Measurement ID:", process.env.MY_MEASUREMENT_ID);

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
    }

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
};

export default CreateProjectPage;