import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "@/libs/database";
import { limit } from "@/libs/rateLimiter"; // Updated import


export async function POST(request){
    try{
        const ip = request.headers.get("x-forwarded-for");
        
        // Use the new limit function
        if (!limit(ip, 5, 60_000)) { // 5 requests per minute
            return NextResponse.json(
                { message: 'Too many requests' }, 
                { 
                    status: 429 , 
                    headers: {
                        "X-RateLimit-Limit": "5",
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": (Date.now() + 60_000).toString(), // Approximate reset time
                    }
                }
            );
        }
        const { username, password } = await request.json();
        if (!username || !password){
            return NextResponse.json({ message: "Username and password are required"},
                {status: 400}
            )
        }
        await connectDB();
        const existingUser = await User.findOne({ username });
        if (existingUser){
            return NextResponse.json({ message: "Username already exists"},
                {status: 400}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        return NextResponse.json({ message: "User created successfully"},
            {status: 201}
        )
    } catch(error){
        return NextResponse.json({ message: "User creation failed"},
            {status: 500}
        )
    }
}