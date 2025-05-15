'use client'
import MovieCard from "../MovieCard"
export default function ProfileWatchlist({watchlist}){
    return(
        <div className="grid py-4 md:py-8 gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {watchlist.map(movie => <MovieCard movie={movie} key={movie._id} isWatchlist={true}/>)}
        </div>
    )
}
