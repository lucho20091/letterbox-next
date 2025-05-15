'use client'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
    const { data: session } = useSession();
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
                <div>
                    Username: <span className="font-bold">{session?.user?.username}</span>
                </div>
                <div>
                    Image:     <div>
      {session?.user?.image ? (
        <Image 
          src={session.user.image} 
          alt="User profile" 
          width={100} 
          height={100}
        />
      ) : (
        // Fallback content when image is not available
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
                </div>
                <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2">
                    Log Out
                </button>
            </div>
        </div>
    );
}
