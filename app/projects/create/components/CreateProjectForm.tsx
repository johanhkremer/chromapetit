'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CreateProjectData, CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaintColumnsProject } from "./PaintsColumsProject";
import { Paint } from "@/schemas/PaintSchema";
import { DataTableProject } from "./data-table-project";
import ColorCircle from "@/components/ColorCircle";
import { useServerAction } from "zsa-react";
import { createProject } from "@/app/actions/projects/createProject";
import LoadSpinner from "@/components/load-spinner";
import Toast from "@/components/toast";

interface CreateProjectFormProps {
    allPaints: Paint[];
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ allPaints }) => {
    const router = useRouter()
    const { isPending, execute, data, isSuccess, error, isError, reset } = useServerAction(createProject);
    const [selectedPaints, setSelectedPaints] = useState<Paint[]>([]);

    const form = useForm<CreateProjectData>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            paints: [],
        },
    });

    const { formState } = form;

    const onSubmit = async (data: CreateProjectData) => {

        try {
            const paintIds = selectedPaints.map((paint) => ({ id: paint.id }));

            const [resultData, resultError] = await execute({
                name: data.name,
                description: data.description,
                paints: paintIds.length > 0 ? paintIds : undefined,
            });

            if (resultError) {
            } else if (resultData) {
                reset();
                router.push("/projects");
            }
        } catch (error) {
            console.error(error);
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
        isPending ? (
            <LoadSpinner />
        ) : isError ? (
            <Toast title="Error" description={error.message} />
        ) : isSuccess ? (
            <Toast title="Success" description={data.message} variant="success" />
        ) : (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mb-3">
                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name" className="text-sm font-semibold mb-2"><span className="text-red-700">*</span>Name</FormLabel>
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
                                <FormLabel htmlFor="description" className="text-sm font-semibold mb-2">Description</FormLabel>
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
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending || !formState.isValid}
                        >
                            {isPending ? "Creating Project..." : "Create Project"}
                        </Button>
                    </div>
                </form>
            </Form>
        )
    );
};

export default CreateProjectForm;
