"use client";
import { useState } from "react";
import Link from "next/link";
export default function MobileMenuButton() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMobileMenu(){
        setIsOpen(prev => !prev);
    }

    return (
        <div className="md:hidden">
            <button 
                onClick={toggleMobileMenu} 
                className="p-2 rounded-md text-white hover:bg-indigo-800/40 transition-colors cursor-pointer"
                aria-label="Toggle Mobile Menu"
                aria-expanded={isOpen}
                >
                {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-200 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
                

            </button>
            <div className={`md:hidden absolute top-16 left-0 right-0 bg-indigo-950 border-t border-indigo-800/40 z-10 transform transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}>
                <nav className="">
                    <Link 
                        href="/" 
                        onClick={toggleMobileMenu} 
                        className="block rounded-md py-6 text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                            <div className="container px-4 mx-auto">
                                Home
                            </div>
                    </Link>
                    <Link 
                        href="/profiles" 
                        onClick={toggleMobileMenu} 
                        className="block py-6 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                            <div className="container px-4 mx-auto">
                                Profiles
                            </div>
                    </Link>
                    <Link 
                        href="/watchlist" 
                        onClick={toggleMobileMenu} 
                        className="block py-6 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                            <div className="container px-4 mx-auto">
                                Watchlist
                            </div>
                    </Link>
                    <Link 
                        href="/login" 
                        onClick={toggleMobileMenu} 
                        className="block py-6 rounded-md text-sm font-medium hover:bg-indigo-800/40 transition-colors">
                            <div className="container px-4 mx-auto"> 
                                Login
                            </div>
                    </Link>
                </nav>
            </div>
        </div>
    )
}
