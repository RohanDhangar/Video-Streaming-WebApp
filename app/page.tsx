"use client"
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function Home() {
  const router = useRouter();
  const { data: session} = useSession();

  if(!session){
    return (
    <>
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Welcome to Video App</h1>
      <p className="text-center mt-4 text-lg">Upload and share your videos with the world!</p> 
    </div>
    <button onClick={() => router.push("/login")}>Sign In</button>
    <button onClick={() => router.push("/register")}>Register</button>    
    </>
  )
  }
  else{
    return (
    <>
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Welcome to Video App `{session.user.email}`</h1>
      <p className="text-center mt-4 text-lg">Upload and share your videos with the world!</p> 
    </div>
    <button onClick={() => signOut()}>
        Logout
      </button>
    </>
  )
  }
}
