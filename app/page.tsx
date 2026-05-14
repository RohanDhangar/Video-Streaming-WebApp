"use client";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import ListVideo from "./components/ListVideo";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Still fetching session — show a neutral loading screen to prevent flicker
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center animate-pulse shadow-lg shadow-violet-500/30">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 text-white relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

        <div className="relative text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 mb-6 shadow-lg shadow-violet-500/30">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            Welcome to StreamVault
          </h1>
          <p className="text-zinc-500 text-base mb-8 leading-relaxed">
            Upload and share your videos with the world. Sign in to get started.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-semibold text-sm hover:bg-white/[0.10] active:scale-[0.98] transition-all duration-200"
            >
              Register
            </button>
          </div>
        </div>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative">
      {/* Background glow */}
      <div className="absolute top-0 left-[20%] w-[600px] h-[300px] rounded-full bg-violet-700/8 blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 border-b border-white/[0.06] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow shadow-violet-500/30">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="font-bold text-white text-base tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              StreamVault
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-zinc-500 text-sm truncate max-w-[180px]">
              {session?.user?.email}
            </span>
            <button
              onClick={() => router.push("/upload")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 active:scale-[0.97] transition-all duration-200 shadow shadow-violet-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Upload
            </button>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-400 text-sm font-medium hover:bg-white/[0.09] hover:text-white active:scale-[0.97] transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            Your Feed
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Welcome back, <span className="text-zinc-300">{session?.user?.email}</span>
          </p>
        </div>

        <ListVideo />
      </main>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}