import { auth } from "@/auth"
import { ModeToggle } from "@/components/dark-mode-switch";
import LoadSpinner from "@/components/load-spinner";

export default async function Home() {
  const session = await auth()

  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  console.log('AUTH_GOOLE_ID:', process.env.AUTH_GOOGLE_ID)
  console.log('AUTH_GOOGLE_SECRET:', process.env.AUTH_GOOGLE_SECRET)

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
