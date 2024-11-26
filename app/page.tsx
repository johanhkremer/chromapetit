import PaginationComponent from "@/components/PaginationComponent";
import Link from "next/link";

export default async function Home(props: { searchParams: Promise<{ page: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div>
      <h1>Home</h1>
      <p>Hello World!</p>
      <Link href='/colors' />
      <PaginationComponent itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </div>
  );
}
