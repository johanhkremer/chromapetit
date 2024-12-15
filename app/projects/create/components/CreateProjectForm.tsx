'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CreateProjectData, CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaintColumnsProject } from "./PaintsColumsProject";
import { Paint } from "@/schemas/PaintSchema";
import { DataTableProject } from "./data-table-project";
import ColorCircle from "@/components/ColorCircle";

interface CreateProjectFormProps {
    allPaints: Paint[];
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ allPaints }) => {
    const router = useRouter()

    const [selectedPaints, setSelectedPaints] = useState<Paint[]>([]);

    const form = useForm<z.infer<typeof CreateProjectSchema>>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: undefined,
            paints: [],
            images: [],
        },
    });

    const handleFormSubmit = async (data: CreateProjectData) => {
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    paints: selectedPaints.map((paint) => ({ paintId: paint.id })),
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="name"
                                    placeholder="Enter name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    id="description"
                                    placeholder="Enter description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="paints"
                    render={() => (
                        <FormItem>
                            <fieldset className="border border-gray-300 p-4 rounded-md">
                                <legend className="text-sm font-semibold mb-2">Select Colors</legend>

                                <FormLabel>Available Colors</FormLabel>
                                <DataTableProject
                                    columns={PaintColumnsProject({
                                        handleAddPaint,
                                        handleRemovePaint,
                                        selectedPaints,
                                    })}
                                    data={allPaints}
                                />

                                <FormLabel>Selected Colors</FormLabel>
                                <ul className="mt-2">
                                    {selectedPaints.map((paint) => (
                                        <li key={paint.id} className="flex justify-between mb-2">
                                            <ColorCircle hexCode={paint.hexCode} size="sm" />
                                            <span>{paint.name} - {paint.brand}</span>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemovePaint(paint.id)}
                                            >
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </fieldset>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit new project</Button>
            </form>
        </Form>
    );
};

export default CreateProjectForm;
