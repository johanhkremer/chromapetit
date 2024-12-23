import { getPaints } from "@/app/actions/paints/getPaints";
import { paintColumns } from "./components/paints-colums";
import { DataTable } from "@/app/paints/components/data-table-paints";
import Toast from "@/components/toast";

const AllPaintsPage = async () => {
    try {
        const allPaints = await getPaints();

        return (
            <section className="container pr-7 light">
                <h1>All Paints</h1>
                <DataTable columns={paintColumns} data={allPaints} />
            </section>
        );
    } catch (error: unknown) {

        return (
            <section className="light">
                <h1>All Paints Page</h1>
                <Toast
                    title="Error"
                    description={error instanceof Error ? error.message : "An unknown error occurred"}
                    variant="destructive"
                />
            </section>
        );
    }
};

export default AllPaintsPage;
