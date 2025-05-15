import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "@/libs/database";

export async function POST(request){
    try{
        const {username, password} = await request.json();
    
        await connectDB();


        const existingUser = await User.findOne({ username });

        if (existingUser) { 
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ username, password: hashedPassword });

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch(error){
        return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
    }
}
