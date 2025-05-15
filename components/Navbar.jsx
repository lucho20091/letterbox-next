'use client'
import Link from "next/link";
import MobileMenuButton from "@/components/MobileMenuButton";   
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session)
  const userAuthenticated = session?.user
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
                {userAuthenticated ? (
                <>
                <Link
                    href={`/profile/${userAuthenticated.username}`}
                    className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    <img src={userAuthenticated.image} alt={userAuthenticated.username} className="w-8 h-8 rounded-full" />
                    <span className="text-sm">{userAuthenticated.username}</span>
                </Link>
                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to logout?")){
                            signOut()
                        }
                    }}
                    className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    Logout
                </button>
                </> ) : (
                <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                    Login
                </Link>
                )}
            </nav>
            {/* Mobile Menu Button */}
            <MobileMenuButton />
        </div>

    </header>
  );
}