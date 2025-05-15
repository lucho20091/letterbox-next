import connectDB from "@/libs/database"
import MovieWatchList from "@/models/MovieWatchList"
import { NextResponse } from "next/server"

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

