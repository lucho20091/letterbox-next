"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
export default function SignupForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }
            
            toast.success("Signup successful. Redirecting to home page...");
        } catch (error) {
            toast.error("Username already exists");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grow grid place-items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 md:p-12 rounded-lg shadow-2xl w-[90%] max-w-md border-2 border-gray-300">
                <h1 className="text-2xl font-bold text-center hover:text-violet-400 transition-colors select-none">Sign Up</h1>
                <div className="flex flex-col">
                    <label htmlFor="username" className="text-sm font-medium text-gray-700 hover:text-violet-400 transition-colors select-none">Username</label>
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="rounded-md p-2 bg-violet-100 focus:outline-violet-400"
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 hover:text-violet-400 transition-colors select-none">Password</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="rounded-md p-2 bg-violet-100 focus:outline-violet-400"
                        autoComplete="current-password"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="rounded-md p-2 bg-violet-950 text-white cursor-pointer hover:bg-violet-950/80 transition-colors">Login</button>
            </form>
            <ToastContainer />
        </div>
    )
}
