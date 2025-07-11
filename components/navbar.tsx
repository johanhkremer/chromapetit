import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    return (
        <header className="w-full border-b">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/chromapetit-logo.png"
                            alt="MyApp Logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>

                {/* Navigation links */}
                <nav className="flex items-center space-x-4">
                    <Link
                        href="/paints"
                        className="text-sm font-medium hover:underline"
                    >
                        Compare Paints
                    </Link>
                </nav>

                {/* Right side actions */}
                <div className="flex items-center space-x-2">
                    {/* Exempel: login button */}
                    <button className="text-sm font-medium">Login</button>
                </div>
            </div>
        </header>
    );
}
