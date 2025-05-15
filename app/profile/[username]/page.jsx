import ProfileData from "@/components/ProfileData"
import MoviesProfile from "@/components/MoviesProfile"
import connectDB from "@/libs/database"
import User from "@/models/User"
import Comment from "@/models/Comment"
import Movie from "@/models/Movie"
import MovieWatchList from "@/models/MovieWatchList"
export default async function Profile({params}){
    const {username} = await params

    async function getProfile(){
        try{
            await connectDB()
            const profile = await User.findOne({username: username}).select("username image")
            return JSON.parse(JSON.stringify(profile))
        } catch(error){
            console.log(error)
        }
    }

    async function getReviews(){
        try{
            await connectDB()
            const comments = await Comment.find({username})
            const moviesRated = await Promise.all(comments.map(async (comment) => {
                const movie = await Movie.findOne({ slug: comment.movieSlug})
                return { ...movie.toObject(), rating: comment.rating}
            }))
            return JSON.parse(JSON.stringify(moviesRated))
        } catch(error){
            console.log(error)
        }
    }

    async function getWatchlist(){
        try{
            await connectDB()
            const watchlist = await MovieWatchList.find({username})
            return JSON.parse(JSON.stringify(watchlist))
        } catch (error) {
            console.log(error)
        }
    }

    const profile = await getProfile()
    const reviews = await getReviews()
    const watchlist = await getWatchlist()

    return(
        <div className="grow">
            <div className="container mx-auto p-4">
                <div className="pt-0 md:pt-8">
                    <ProfileData profile={profile} reviews={reviews} watchlist={watchlist}/>
                </div>
                <MoviesProfile profile={profile} reviews={reviews} watchlist={watchlist}/>
            </div>
        </div>
    )
}
