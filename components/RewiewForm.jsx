"use client"
import { useSession } from "next-auth/react"
import { IoSendSharp } from "react-icons/io5"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
export default function RewiewForm({movieSlug}){
    const router = useRouter()
    const { data: session } = useSession()
    const userAuthenticated = session?.user
    const [formData, setFormData] = useState({
        username: "",
        image: "",
        comment: "",
        rating: "9",
        movieSlug: ""
    })
    // const { username, image, comment, rating, movieSlug } = await request.json();
    useEffect(() => {
        if (movieSlug){
            setFormData(prev => ({...prev, movieSlug}))
        }
    }, [movieSlug])
    useEffect(() => {
        if (userAuthenticated){
            setFormData(prev => ({...prev, username: userAuthenticated.username, image: userAuthenticated.image}))
        }
    }, [userAuthenticated?.username, userAuthenticated?.image])

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await fetch("/api/review", {
                method: "POST",
                body: JSON.stringify(formData),
            })
            if (response.status === 400){
                toast.error("You already left a review for this movie")
                return
            }
            if (response.status === 500){
                toast.error("Please log in to leave a review")
                return
            }
            setFormData(prev => ({...prev, comment: ""}))
            console.log(response)
            toast.success("Review created successfully")
            router.refresh()
        } catch (error){ 
            toast.error("Error creating review")
        }
    }

    return (
        <div className="mt-4 md:mt-8 max-w-screen-lg mx-auto">
            <form className="bg-gradient-to-r from-indigo-950 to-violet-950 p-4 rounded-xl shadow-lg border border-indigo-800/50 backdrop-blur-lg" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 w-full">
                    {userAuthenticated && <img src={userAuthenticated.image} alt={`${userAuthenticated.username} profile picture`} className="hidden md:block w-10 h-10 rounded-full border-4 border-purple-400" />}
                    <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="flex-1 min-w-36 p-2 bg-indigo-800 rounded-lg text-white placeholder-indigo-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed" 
                    value={formData.comment}
                    onChange={handleChange}
                    onClick={() => !userAuthenticated && toast.error("You must be logged in to leave a comment")}
                    name="comment"
                    />
                    <select 
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="py-2 text-white bg-indigo-800 rounded-lg cursor-pointer"
                    >
                        <option value="10">5.0</option>
                        <option value="9">4.5</option>
                        <option value="8">4.0</option>
                        <option value="7">3.5</option>
                        <option value="6">3.0</option>
                        <option value="5">2.5</option>
                        <option value="4">2.0</option>
                        <option value="3">1.5</option>
                        <option value="2">1.0</option>
                        <option value="1">0.5</option>
                    </select>
                    <button 
                    type="submit"
                    className="cursor-pointer px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-500 hover:to-violet-500">
                        <IoSendSharp/>
                    </button>
                </div>
            </form>
        </div>
    )
}
