"use client"
import { useRouter } from "next/navigation"
export default function ButtonBack(){
    const router = useRouter()  
    return (
        <button 
            onClick={() => router.back()} 
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer group">
                        <svg
                            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                        </svg>
                        <span className="group-hover:font-semibold transition-all duration-300">Back to Movies</span>
        </button>
    )
}
