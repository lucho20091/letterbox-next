import { NextResponse } from "next/server";
import connectDB from "@/libs/database";
import MovieWatchList from "@/models/MovieWatchList";
import User from "@/models/User";
export async function DELETE(request, {params}){
    const {id} = params
    const {username} = await request.json()
    try{
        await connectDB()
        const isUserAuthToDelete = await User.find({ username: username })
        if (!isUserAuthToDelete) {
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        const isMovieInWatchlist = await MovieWatchList.find({imdbID: id, username: username})
        if (!isMovieInWatchlist) {
            return NextResponse.json({message: "Movie not found in watchlist"}, {status: 404})
        }
        await MovieWatchList.deleteOne({imdbID: id, username: username})
        return NextResponse.json({message: "Movie deleted from watchlist"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error deleting movie from watchlist"}, {status: 500})
    }
}

export async function POST(request){
    const {username, imdbID, image, title} = await request.json()
    try{
        await connectDB()
        const existingMovie = await MovieWatchList.findOne({imdbID, username})
        if (existingMovie){
            return NextResponse.json({message: "Movie already in watchlist"}, {status: 400})
        }
        await MovieWatchList.create({username, imdbID, image, title})
        return NextResponse.json({message: "Movie added to watchlist"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Error adding movie to watchlist"}, {status: 500})
    }
}

