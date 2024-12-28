import { getPaints } from "@/app/actions/paints/getPaints";
import { paintColumns } from "./components/paints-colums";
import { DataTable } from "@/app/paints/components/data-table-paints";
import { toast } from "sonner"

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
        toast.error(`Something went wrong: ${(error as Error).message}`);

        return (
            <>
                <section className="light">
                    <h1>Unable to load paints</h1>
                </section>
            </>
        );
    }
};

export default AllPaintsPage;
