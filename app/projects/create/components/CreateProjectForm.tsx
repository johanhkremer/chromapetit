'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateProjectData, CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";



const CreateProjectForm: React.FC = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof CreateProjectSchema>>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: undefined,
            paints: [],
            images: [],
        },
    })

    const handleFormSubmit = async (data: CreateProjectData) => {
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            console.log("Project created successfully!");
            router.push("/projects");
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Enter name"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Enter description"
                    {...register("description")}
                />
                {errors.description && (<p className="text-red-500">{errors.description.message}</p>)}
            </div>
            <Button type="submit">Submit new project</Button>
        </form>
    );
};

export default CreateProjectForm;

//https://www.npmjs.com/package/react-simplemde-editor alternativ till textarea
