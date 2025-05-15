"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import ProfileWatchlist from "./profileMoviesProfile/ProfileWatchlist"
import ProfileSearch from "./profileMoviesProfile/ProfileSearch"
import ProfileReviews from "./profileMoviesProfile/ProfileReviews"
export default function MoviesProfile({profile, reviews, watchlist}){
    const [activeTab, setActiveTab] = useState("reviews")
    const {data: session} = useSession()
    const userAuthenticated = session?.user

    return(
        <div className="mt-4 md:mt-8">
            <div className="max-w-md mx-auto">
                <button 
                onClick={() => setActiveTab('reviews')}
                className={`${activeTab === 'reviews' ? 'cursor-pointer text-purple-600 border-b-2 border-purple-600' : 'cursor-pointer text-indigo-600 hover:text-indigo-400'} px-4 py-2 font-medium text-sm sm:text-lg transition-colors duration-300`}
                >Reviews</button>
                <button 
                onClick={() => setActiveTab('watchlist')}
                className={`${activeTab === 'watchlist' ? 'cursor-pointer text-purple-600 border-b-2 border-purple-600' : 'cursor-pointer text-indigo-600 hover:text-indigo-400'} px-4 py-2 font-medium text-sm sm:text-lg transition-colors duration-300`}
                >Watchlist</button>
                {userAuthenticated?.username === profile.username && <button 
                onClick={() => setActiveTab('search')}
                className={`${activeTab === 'search' ? 'cursor-pointer text-purple-600 border-b-2 border-purple-600' : 'cursor-pointer text-indigo-600 hover:text-indigo-400'} px-4 py-2 font-medium text-sm sm:text-lg transition-colors duration-300`}
                >Search Movies</button>}
            </div>
            {activeTab === 'reviews' && <ProfileReviews reviews={reviews}/>}
            {activeTab === 'watchlist' && <ProfileWatchlist watchlist={watchlist}/>}
            {activeTab === 'search' && <ProfileSearch/>}
        </div>
    )
}
