import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "@/libs/database";
import ratelimit from "@/libs/ratelimiter";


export async function POST(request){
    try{
        const ip = request.headers.get("x-forwarded-for");
        const { limit, reset, remaining } = await ratelimit.limit(ip);
        if (remaining === 0){
            return NextResponse.json(
                { message: 'Too many requests' }, 
                { 
                    status: 429 , 
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
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

