import { auth } from "@/auth"
import LoadSpinner from "@/components/load-spinner";

export default async function Home() {
  const session = await auth()

  return (
    <div>
      <h1>Welcome</h1>
      <p>{session?.user?.name}</p>
      <LoadSpinner />
    </div>
  );
}
