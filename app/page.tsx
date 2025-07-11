import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="relative w-full h-[400px]">
        <Image
          src="/hero.png"
          alt="ChromaPetit Hero"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>
      <div className="flex flex-col items-center py-4">
        <h1>Welcome to ChromaPetit</h1>
        <span className="text-lg text-gray-600 mt-4">
          A web application for comparing paint colors.
        </span>
        <span className="text-sm text-gray-500 mt-2">
          Click on the navigation links to get started.
        </span>
      </div>
    </>
  );
}
