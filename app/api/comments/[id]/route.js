import { NextResponse } from 'next/server'
import connectDB from '@/libs/database'
import Comment from '@/models/Comment'

export async function DELETE(request, {params}){
    const {id} = await params
    const {user} = await request.json()

    try{
        await connectDB()
        const hasUserComment = await Comment.findOne({_id: id, username: user.username})
        if (!hasUserComment){
            return NextResponse.json({message: 'You are not allowed to delete this comment'}, {status: 403})
        }
        await Comment.findByIdAndDelete(id)
        return NextResponse.json({message: 'Comment deleted successfully'}, {status: 200})
    } catch (error){
        console.log(error)
        return NextResponse.json({message: 'Failed to delete comment'}, {status: 500})
    }
}
