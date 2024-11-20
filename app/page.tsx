import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Hello World!</p>
      <Link href='/colormatch' />
    </div>
  );
}
