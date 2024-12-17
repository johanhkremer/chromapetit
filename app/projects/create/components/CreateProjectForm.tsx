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
import { FormEvent, useActionState, useState } from "react";
import { PaintColumnsProject } from "./PaintsColumsProject";
import { Paint } from "@/schemas/PaintSchema";
import { DataTableProject } from "./data-table-project";
import ColorCircle from "@/components/ColorCircle";
import { useServerAction } from "zsa-react";
import { CreateProject } from "@/app/actions/create-project";

interface CreateProjectFormProps {
    allPaints: Paint[];
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ allPaints }) => {
    const { isPending, execute, data, reset } = useServerAction(CreateProject);
    const router = useRouter()

    const [selectedPaints, setSelectedPaints] = useState<Paint[]>([]);

    const handleAddPaint = (paint: Paint) => {
        setSelectedPaints((prev) =>
            prev.some((p) => p.id === paint.id) ? prev : [...prev, paint]
        );
    };

    const handleRemovePaint = (paintId: string) => {
        setSelectedPaints((prev) => prev.filter((p) => p.id !== paintId));
    };

    // Initialize the form using `useForm`
    const form = useForm<CreateProjectData>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            paints: [],
        },
    });

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const paints = JSON.parse(formData.get("paints") as string) as Paint[];

        if (!name || !description || !paints) {
            return;
        }

        const [data, error] = await execute({
            name,
            description,
            paints,
        });

        if (error) {
            console.error(error);
        } else if (data) {
            reset();
            console.log(data);
            router.push("/projects");
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
                <FormField
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
                <input type="hidden" name="paints" value={JSON.stringify(selectedPaints)} />
                <Button type="submit">Submit new project</Button>
            </form>
        </Form>
    );
};

export default CreateProjectForm;
