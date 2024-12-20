import React from "react";
import { getPaints } from "@/app/actions/paints/getPaints"; // Importera server action
import { paintColumns } from "./components/paints-colums";
import { DataTable } from "@/app/paints/components/data-table-paints";
import Toast from "@/components/toast";

const AllPaintsPage = async () => {
    try {
        const allPaints = await getPaints();

        return (
            <div className="container mt-7 pr-5 sm:w-full md:w-9/10 xl:w-4/5">
                <h1 className="text-xl font-bold mb-4">All Paints</h1>
                <DataTable columns={paintColumns} data={allPaints} />
            </div>
        );
    } catch (error: unknown) {

        return (
            <div>
                <h1 className="text-xl font-bold mb-4">All Paints Page</h1>
                <Toast
                    title="Error"
                    description={error instanceof Error ? error.message : "An unknown error occurred"}
                    variant="destructive"
                />
            </div>
        );
    }
};

export default AllPaintsPage;
