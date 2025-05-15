'use client'

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function AuthProvider({children}){
    return(
        <SessionProvider>
            {children}
            <ToastContainer />
        </SessionProvider>
    )
}
