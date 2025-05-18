import Link from "next/link"
import MovieCard from "@/components/MovieCard"
import connectDB from "@/libs/database"
import MovieWatchList from "@/models/MovieWatchList"
import User from "@/models/User"
import { LoadingProvider } from "../Providers"

async function fetchWatchlist(){
    try{
        await connectDB()
        const watchlist = await MovieWatchList.find()
        const data = await Promise.all(watchlist.map(async (movie) => {
            const userImage = await get_User(movie.username);
            return { ...movie.toObject(), userImage: userImage.image };
        }));
        const dataByUsername = data.reduce((acc, movie) => {
            acc[movie.username] = acc[movie.username] || [];
            acc[movie.username].push(movie);
            return acc;
        }, {});
        return JSON.parse(JSON.stringify(dataByUsername))
    } catch(error){
        console.error("Error fetching watchlist", error)
    }
}

async function get_User(username){
    try{
        await connectDB()
        const user = await User.findOne({username}).select("username image")
        return user
    } catch(error){
        console.error("Error fetching user", error)
    }
}

export default async function Watchlist() {
    let usersWatchlist


    const watchlist = await fetchWatchlist()
    usersWatchlist = Object.keys(watchlist)


    return (
        <div className='grow'>
                <LoadingProvider>
                <div className="container mx-auto p-4">
                    <div className="pt-0 md:pt-8">
                    <h1 className="text-4xl font-bold mb-2">Watchlist</h1>
                    <p className="text-gray-700">Keep track of the movies you want to watch</p>
                </div>
                <div className="mt-4 md:mt-8">
                    {usersWatchlist && usersWatchlist.map((user) => (
                        <div key={user} className="mb-4 md:mb-8 flex flex-col gap-4 sm:gap-6">
                            <Link 
                            className="flex items-center gap-2 w-fit cursor-pointer" 
                            href={`/profile/${user}`}>
                                <img src={watchlist[user][0].userImage} alt={watchlist[user][0].username} className="w-10 h-10 rounded-full border-2 border-purple-400" />
                                <p className="font-bold underline underline-offset-8 decoration-purple-400">{user}</p>
                            </Link>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                                {watchlist[user].map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} isWatchlist={true} />
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </LoadingProvider>
            </div>
    )
}
