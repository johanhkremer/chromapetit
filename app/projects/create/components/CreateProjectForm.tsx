'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { CreateProjectData, CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaintColumnsProject } from "./PaintsColumsProject";
import { Paint } from "@/schemas/PaintSchema";
import { DataTableProject } from "./data-table-project";
import ColorCircle from "@/components/color-circle";
import { useServerAction } from "zsa-react";
import { createProject } from "@/app/actions/projects/createProject";
import LoadSpinner from "@/components/load-spinner";
import ImageUpload from "@/components/upload-image";
import { toast } from "sonner"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card";

interface CreateProjectFormProps {
    allPaints: Paint[];
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ allPaints }) => {
    const router = useRouter()
    const { isPending, execute, data, isSuccess, error, isError, reset } = useServerAction(createProject);
    const [selectedPaints, setSelectedPaints] = useState<Paint[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const form = useForm<CreateProjectData>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            paints: [],
            images: [],
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
                images: uploadedImages.length > 0 ? uploadedImages : undefined,
            });

            if (resultError) {
            } else if (resultData) {
                const projectId = resultData.projectId;
                router.push(`/projects/${projectId}`);
                reset();
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

    const handleImageSubmit = (imageUrl: string) => {
        setUploadedImages((prev) => [...prev, imageUrl]);
    };

    return (
        isPending ? (
            <LoadSpinner />
        ) : isError ? (
            toast.error(`Error:, ${error.message}`)
        ) : isSuccess ? (
            toast.success(`Success:, ${data.message}`)
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
                    <Accordion type="multiple">
                        <FormField
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <AccordionItem value="description">
                                        <AccordionTrigger>
                                            <FormLabel htmlFor="description" className="text-sm font-semibold mb-2">Description</FormLabel>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <FormControl>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Enter description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />

                                        </AccordionContent>
                                    </AccordionItem>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="paints"
                            render={() => (
                                <FormItem>
                                    <AccordionItem value="paints">
                                        <AccordionTrigger>
                                            <FormLabel htmlFor="description" className="text-sm font-semibold mb-2">Choose Paints</FormLabel>
                                        </AccordionTrigger>
                                        <AccordionContent>

                                            <DataTableProject
                                                columns={PaintColumnsProject({
                                                    handleAddPaint,
                                                    handleRemovePaint,
                                                    selectedPaints,
                                                })}
                                                data={allPaints}
                                            />
                                            <FormLabel>Selected Paints</FormLabel>
                                            <ul className="mt-2">
                                                {selectedPaints.map((paint) => (
                                                    <li key={paint.id} className="mb-2">
                                                        <Card className="flex items-center w-full p-2 bg-gray-100">
                                                            <div className="flex-shrink-0">
                                                                <ColorCircle hexCode={paint.hexCode} size="sm" />
                                                            </div>
                                                            <div className="flex-1 text-center">
                                                                <span>{paint.name} - {paint.brand}</span>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleRemovePaint(paint.id)}
                                                                    className="hover:bg-transparent hover:text-red-700"
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        </Card>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="images"
                            render={() => (
                                <FormItem>
                                    <AccordionItem value="images">
                                        <AccordionTrigger>
                                            <FormLabel htmlFor="images" className="text-sm font-semibold mb-2">Upload images</FormLabel>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <FormControl>
                                                <ImageUpload onChange={handleImageSubmit} />
                                            </FormControl>
                                            <FormMessage />
                                        </AccordionContent>
                                    </AccordionItem>
                                </FormItem>
                            )}
                        />
                    </Accordion>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending || !formState.isValid}
                        >
                            {isPending ? "Creating Project..." : "Create Project"}
                        </Button>
                    </div>

                </form>
            </Form >
        )
    );
};

export default CreateProjectForm;
