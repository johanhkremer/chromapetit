import { auth } from "@/auth"
import { ModeToggle } from "@/components/dark-mode-switch";
import LoadSpinner from "@/components/load-spinner";

export default async function Home() {
  const session = await auth()

  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
  console.log('NEXT_PUBLIC_DATABASE_URL:', process.env.NEXT_PUBLIC_DATABASE_URL)
  console.log('NEXT_PUBLIC_NEXTAUTH_URL:', process.env.NEXT_PUBLIC_NEXTAUTH_URL)
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)

  return (
    <>
      <div>
        <h1>Welcome</h1>
        <p>{session?.user?.name}</p>
        <LoadSpinner />
        <ModeToggle />
      </div>
    </>
  );
}
