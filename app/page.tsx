import { Link } from "lucide-react";

export default async function Home() {

  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  console.log('AUTH_GOOLE_ID:', process.env.AUTH_GOOGLE_ID)
  console.log('AUTH_GOOGLE_SECRET:', process.env.AUTH_GOOGLE_SECRET)

  return (
    <>
      <div>
        <h1>Welcome to ChromaPetit</h1>
        <Link href="/paints">View Paints</Link>
      </div>
    </>
  );
}
