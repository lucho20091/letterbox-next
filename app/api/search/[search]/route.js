import { NextResponse } from "next/server"

export async function GET(request, {params}){
    const {search} = await params
    try{        
        const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${search}`)
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error){
        return NextResponse.json({message: "Error searching for movies"}, {status: 500})
    }
}
