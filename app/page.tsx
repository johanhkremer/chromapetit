export default async function Home() {

  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  console.log('AUTH_GOOLE_ID:', process.env.AUTH_GOOGLE_ID)
  console.log('AUTH_GOOGLE_SECRET:', process.env.AUTH_GOOGLE_SECRET)

  return (
    <>
      <div className="flex flex-col items-center mt-20 min-h-screen py-2">
        <h1>Welcome to ChromaPetit</h1>
        <span className="max-w-96"><p>Your ultimate tool for miniature painting enthusiasts! Whether you&apos;re a beginner or an experienced artist, ChromaPetit helps you explore and compare paints from various manufacturers, manage your color projects, and find the perfect match for your creations. Designed for ease of use, with a sleek dark theme and intuitive tools, ChromaPetit is here to make your miniature painting journey more vibrant and inspiring. Let your creativity shine!</p>
        </span>
      </div>
    </>
  );
}
