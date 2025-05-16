import connectDB from '@/libs/database'
import Movie from '@/models/Movie'
import Comment from '@/models/Comment'
import ButtonBack from '@/components/ButtonBack'
import MainCard from '@/components/MainCard'
import RewiewForm from '@/components/RewiewForm'
import MovieComments from '@/components/MovieComments'
import { LoadingProvider } from '@/app/Providers'

export async function generateMetadata({params}){
    try{
        const {slug} = await params
        const movie = await Movie.findOne({slug})
        return {
            title: `${movie.title} - LetterboxdMovies`
        }
    } catch (error){
        return {
            title: "Movie not found - LetterboxdMovies"
        }
    }
}
export default async function MoviePage({params}){
    const {slug} = await params

    async function getMovie(){
        try{
            await connectDB()
            const res = await Movie.findOne({slug})
            const movieInfo = JSON.parse(JSON.stringify(res))
            return movieInfo
        } catch (error){
            console.log(error)
        }
    }
    async function getComments(){
        try {
            await connectDB()
            const res = await Comment.find({ movieSlug: slug}).sort({createdAt: -1})
            const comments = JSON.parse(JSON.stringify(res))
            return comments
        } catch (error){
            console.log(error)
        }
    }
    const movie = await getMovie()
    const comments = await getComments()

    return (
        <div className="grow">
            <LoadingProvider>
                <div className="container mx-auto p-4">
                    <div className="pt-0 md:pt-8">
                    <ButtonBack />
                    {movie ? (
                        <>
                            <MainCard movie={movie} comments={comments} />
                            <RewiewForm movieSlug={slug}/>
                            <MovieComments comments={comments}/>
                        </>
                    ) : (
                        <p className='text-center text-2xl mt-20'>Movie not found</p>
                    )
                    }
                    </div>
                </div>
            </LoadingProvider>
        </div>
    )
}
