"use client";

import React, { useEffect, useState } from "react";

type Video = {
  _id: string;
  title: string;
  description: string;
  videoURL: string;
  thumbnailURL: string;
};

function ListVideo() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetch("/api/video").then((res) => res.json());
      console.log(data);
      setVideos(data);
      setLoading(false);
    };

    getVideos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] animate-pulse">
            <div className="aspect-video bg-white/[0.06]" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-white/[0.06] rounded-md w-3/4" />
              <div className="h-3 bg-white/[0.04] rounded-md w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-zinc-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
        </div>
        <p className="text-zinc-500 text-sm">No videos yet. Be the first to upload!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        <div
          key={video._id}
          className="group rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.07] hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
        >
          {/* Thumbnail / Video toggle */}
          <div className="relative aspect-video bg-black overflow-hidden">
            {activeVideo === video._id ? (
              <video
                src={video.videoURL}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img
                  src={video.thumbnailURL}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play overlay */}
                <button
                  onClick={() => setActiveVideo(video._id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-150">
                    <svg className="w-5 h-5 text-zinc-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-4 space-y-1.5">
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {video.title}
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListVideo;