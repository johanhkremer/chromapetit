import { getPaints } from "@/app/actions/paints/getPaints";
import { paintColumns } from "./components/paints-colums";
import { DataTable } from "@/app/paints/components/data-table-paints";

const AllPaintsPage = async () => {
    try {
        const allPaints = await getPaints();

        console.log("All Paints:", allPaints);

        return (
            <section className="container light pt-5 lg:pr-7">
                <h1>Paints</h1>
                <p className="text-sm text-muted-foreground">
                    Here you can compare paints from different manufacturers. Click on the color to see similar colors.
                </p>
                <DataTable columns={paintColumns} data={allPaints} />
            </section>
        );
    } catch (error: unknown) {

        return (
            <section className="light">
                <h1>Paints</h1>
                <p>{error instanceof Error ? error.message : "An unknown error occurred"}</p>
            </section>
        );
    }
};

export default AllPaintsPage;
