'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoTrashOutline } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

export default function MovieCard({movie, isWatchlist, isSearch}){
    let title, year
    if(movie.titleYear){
        const titleYear = movie.titleYear.split('(')
        title = titleYear[0].trim() 
        year = titleYear[1].replace(')', '').trim() 
    }
    const router = useRouter()
    const {data: session} = useSession()
    const userAuthenticated = session?.user

    const deleteFromWatchlist = async (imdbID, e) => {
        e.preventDefault();

        if (!window.confirm('Are you sure you want to delete this movie from your watchlist?')) {
            return;
        }

        try{
            const response = await fetch(`/api/watchlist/${imdbID}`, {
                method: 'DELETE',
                body: JSON.stringify({username: userAuthenticated?.username})
            })
            const data = await response.json()
            if (!response.ok){
                toast.error(data.message || 'Failed to delete movie from watchlist');
                return
            }
            toast.success(data.message || 'Movie deleted from watchlist');
            router.refresh()
        } catch (error) {
            toast.error("Network error. Please try again.")
        }
    }

    const addToWatchList = async (movie) => {
        try{
            const response = await fetch(`/api/watchlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userAuthenticated?.username,
                    imdbID: movie.imdbID,
                    image: movie.Poster,
                    title: movie.Title
                })
            })
            const data = await response.json()
            if (!response.ok){
                toast.error(data.message || 'Failed to add movie to watchlist');
                return
            }
            toast.success(data.message || 'Movie added to watchlist');
            router.refresh()
        } catch (error) {
            toast.error('Network error. Please try again.')
        }
    }

    return !isWatchlist && !isSearch ? (
        <div 
        className="group cursor-pointer" 
        onClick={() => router.push(`/movie/${movie.slug}`)}>
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl aspect-[2/3] sm:aspect-[2/3]">
                {movie?.image && <Image src={movie.image} alt={movie.title} fill className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 flex justify-between">
                        <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-1">{title}</h2>
                        <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2">{year}</h2>
                    </div>
                </div>
                {movie?.rating && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-1 
                 px-1 sm:px-2 py-1 sm:py-2 rounded-lg bg-black/50 group-hover:opacity-0 opacity-100 transition-all duration-300">
                    {Array.from({ length: Math.floor(movie.rating/2)}).map((_, index) => (
                        <span key={index} className="text-yellow-500 text-base sm:text-xl group-hover:text-yellow-300">★</span>
                    ))}
                    <span className="text-sm sm:text-lg font-semibold text-white group-hover:font-bold">{movie.rating/2}/5</span>
                </div>)}
                
            </div>
        </div>
    ) : isSearch ? (
<div className="group cursor-pointer" onClick={() => addToWatchList(movie)}>  
        <div  className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl 
            aspect-[2/3] sm-aspect-[2/3]">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-2 text-center">{movie.Title} {movie.Year.substring(0,4)}</h2>
                </div>
            </div>
        </div>
    </div>
    ) :
    (
        <div className="group">  
        <div  className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl 
            aspect-[2/3] sm-aspect-[2/3]">
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-2 text-center">{movie.title}</h2>
                </div>
            </div>
            {userAuthenticated?.username === movie.username && <button className="cursor-pointer absolute top-2 right-2 bg-red-600 px-1 md:px-2 py-1 text-white rounded-sm flex items-center gap-1 hover:bg-red-700 transition-all duration-300" onClick={(e) => deleteFromWatchlist(movie.imdbID, e)}>
                <IoTrashOutline />
                <span className="text-sm">Delete</span>
            </button>}
        </div>
    </div>
    )
}
