import Link from "next/link";
import MobileMenuButton from "@/components/MobileMenuButton";
export default function Navbar() {
  return (
    <header className="relative bg-gradient-to-r from-indigo-950 to-violet-950 text-white shadow-lg py-4">
        <div className="container mx-auto px-4 flex justify-between items-center h-8">
            <Link href="/" className="text-xl font-bold">
                <span className="text-purple-400">Letterboxd</span>
                <span className="text-white">Movies</span>
            </Link>
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-4">
                <Link 
                    href="/" 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    Home
                </Link>
                <Link
                    href="/profiles"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    Profiles
                </Link>
                <Link
                    href="/watchlist"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    Watchlist
                </Link>
                <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    Login
                </Link>
            </nav>
            {/* Mobile Menu Button */}
            <MobileMenuButton />
        </div>

    </header>
  );
}