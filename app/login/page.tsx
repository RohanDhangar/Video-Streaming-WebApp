"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/");
    }
  };

  // return (
  //   <div>
  //     <h1>login Page</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="email"
  //         placeholder="Enter the Email ID"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />

  //       <input
  //         type="password"
  //         placeholder="Enter the password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />

  //       <button type="submit"> Submit </button>
  //     </form>
  //     <div>
  //       Don't have an account ?
  //       <button onClick={() => router.push("/register")}>Register</button>
  //     </div>
  //   </div>
  // );

  
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
 
      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 mb-4 shadow-lg shadow-violet-500/30">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            Welcome back
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">Sign in to continue to StreamVault</p>
        </div>
 
        {/* Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
              />
            </div>
 
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
              />
            </div>
 
            <button
              type="submit"
              className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm tracking-wide hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              Sign In
            </button>
          </form>
 
          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-zinc-500 text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-150 ml-1"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
 
      {/* Google font import via style tag */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}

export default LoginPage;
