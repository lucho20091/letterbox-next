import { NextResponse } from "next/server";
import connectDB from "@/libs/database";
import Comment from "@/models/Comment";

export async function POST(request){
    try{
        const { username, image, comment, rating, movieSlug } = await request.json();
        await connectDB();
        const existingComment = await Comment.findOne({username, movieSlug})
        if (existingComment){
            return NextResponse.json({message: "You already left a review for this movie"}, {status: 400})
        }
        await Comment.create({username, image, comment, rating: Number(rating), movieSlug})
        return NextResponse.json({message: "Review created successfully"}, {status: 201})
    } catch (error){
        console.log(error)
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }
}