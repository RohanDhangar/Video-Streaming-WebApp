"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { useSession } from "next-auth/react";
import { UploadResponse } from "@imagekit/next";

function UploadMedia() {
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [videoURL, setvideoURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async () => {
    try {
      console.log(videoURL, thumbnailURL, title, description);
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoURL,
          thumbnailURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
      }
      alert("your video uploaded successfully");
      console.log(data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (session) {
    //   return(
    // <>
    //   <div>Upload your media</div>
    //   <input
    //     type="text"
    //     placeholder="Enter the video title"
    //     value={title}
    //     onChange={(e) => {
    //       setTitle(e.target.value);
    //     }}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Enter the video description"
    //     value={description}
    //     onChange={(e) => {
    //       setDescription(e.target.value);
    //     }}
    //   />
    //   choose the thumbnail
    //   <FileUpload
    //     onSuccess={(res) => {
    //       setThumbnailURL(res.url);
    //     }}
    //   />
    //   choose the video
    //   <FileUpload
    //     onSuccess={(res) => {
    //       setvideoURL(res.url);
    //     }}
    //   />
    //   <button type="submit" onClick={handleSubmit}>submit</button>
    // </>
    //   )

    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white px-4 py-12 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[300px] rounded-full bg-violet-700/10 blur-[130px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] transition-colors"
            >
              <svg
                className="w-5 h-5 text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Upload Video
              </h1>
              <p className="text-zinc-500 text-sm mt-0.5">
                Share your content with the world
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 space-y-7 backdrop-blur-sm shadow-2xl">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Title
              </label>
              <input
                type="text"
                placeholder="Give your video a great title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                placeholder="Tell viewers about your video..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 resize-none"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06]" />

            {/* Thumbnail Upload */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                  Thumbnail
                </label>
                <p className="text-zinc-600 text-xs mt-0.5">
                  Upload a thumbnail image for your video
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-dashed border-white/[0.12] rounded-xl px-4 py-4 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all duration-200">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <FileUpload onSuccess={(res: UploadResponse) => setThumbnailURL(res.url!)} />
                </div>
                {thumbnailURL && (
                  <svg
                    className="w-5 h-5 text-emerald-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                  Video File
                </label>
                <p className="text-zinc-600 text-xs mt-0.5">
                  Max file size: 100MB
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/[0.03] border border-dashed border-white/[0.12] rounded-xl px-4 py-4 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all duration-200">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-violet-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <FileUpload
                    onSuccess={(res: UploadResponse) => setvideoURL(res.url!)}
                    fileType="video"
                  />
                </div>
                {videoURL && (
                  <svg
                    className="w-5 h-5 text-emerald-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm tracking-wide hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              Publish Video
            </button>
          </div>
        </div>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>
      </div>
    );
  } else {
    //   return(
    //   <>
    //   <div>
    //     <h1 className="text-4xl font-bold text-center mt-10">Welcome to Video App</h1>
    //     <p className="text-center mt-4 text-lg">Upload and share your videos with the world!</p>
    //   </div>
    //   <button onClick={() => router.push("/login")}>Sign In</button>
    //   <button onClick={() => router.push("/register")}>Register</button>
    //   </>
    // )

    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 text-white relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

        <div className="relative text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 mb-6 shadow-lg shadow-violet-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold mb-3 tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
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
}

export default UploadMedia;
