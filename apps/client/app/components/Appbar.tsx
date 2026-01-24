"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { LoginButton } from "./LoginButton";

export const Appbar = () => {
    const session = useSession();
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 m-2">
                <LoginButton />
                <button className="border rounded-md p-2" onClick={() => signIn()}>Signin</button>
                <button className="border rounded-md p-2" onClick={() => signOut()}>Logout</button>
            </div>

            <div>
                {JSON.stringify(session)}
            </div>
        </div>
    )
}