export default async function Home() {

  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  console.log('AUTH_GOOLE_ID:', process.env.AUTH_GOOGLE_ID)
  console.log('AUTH_GOOGLE_SECRET:', process.env.AUTH_GOOGLE_SECRET)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Welcome to ChromaPetit</h1>
      </div>
    </>
  );
}
