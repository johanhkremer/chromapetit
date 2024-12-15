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
import { useState } from "react";
import { PaintColumnsProject } from "./PaintsColumsProject";
import { Paint } from "@/schemas/PaintSchema";
import { DataTableProject } from "./data-table-project";

interface CreateProjectFormProps {
    allPaints: Paint[];
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ allPaints }) => {
    const router = useRouter()

    const [selectedPaints, setSelectedPaints] = useState<Paint[]>([]);

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
                body: JSON.stringify({
                    ...data,
                    paints: selectedPaints
                }),
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

    const handleAddPaint = (paint: Paint) => {
        setSelectedPaints((prev) =>
            prev.some((p) => p.id === paint.id) ? prev : [...prev, paint]
        );
    };

    const handleRemovePaint = (paintId: string) => {
        setSelectedPaints((prev) => prev.filter((p) => p.id !== paintId));
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

            {/* Tabell för färger */}
            <div>
                <Label>Colors</Label>
                <DataTableProject
                    columns={PaintColumnsProject({
                        handleAddPaint,
                        selectedPaints,
                    })}
                    data={allPaints}
                />
            </div>

            {/* Valda färger */}
            <div>
                <Label>Selected Colors</Label>
                <ul>
                    {selectedPaints.map((paint) => (
                        <li key={paint.id}>
                            {paint.name} - {paint.brand}{" "}
                            <Button
                                variant="destructive"
                                onClick={() => handleRemovePaint(paint.id)}
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Button type="submit">Submit new project</Button>
        </form>
    );
};

export default CreateProjectForm;

//https://www.npmjs.com/package/react-simplemde-editor alternativ till textarea
