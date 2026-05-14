"use client"; // This component must be a client component

import { upload } from "@imagekit/next";
import React, { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [Error, setError] = useState<string | null>(null);

  // optional validation

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) {
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      //console.log(authRes);
      const auth = await authRes.json();
      // console.log(auth);

      // console.log("expire:", auth.authenticationParams.expire);
      // console.log("token:", auth.authenticationParams.token)
      // console.log("singature:", auth.authenticationParams.signature);
      // console.log("publicKey:", process.env.NEXT_PUBLIC_PUBLIC_KEY!);

      const res = await upload({
        // Authentication parameters
        expire: auth.authenticationParams.expire,
        token: auth.authenticationParams.token,
        signature: auth.authenticationParams.signature,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        file,
        fileName: file.name,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            // onProgress(Math.round(percent));
            setProgress(percent);
            if (onProgress) onProgress(percent);
          }
        },
      });
      console.log(res);
      onSuccess(res);
    } catch (error) {
      alert(error);
    } finally {
      setUploading(false);
    }
  };

  // return (
  //   <>
  //     <input
  //       type="file"
  //       accept={fileType === "video" ? "video/*" : "image/*"}
  //       onChange={handleFileChange}
  //     />
  //     {uploading && <span>Loading....</span>}
  //   </>
  // );

  return (
    <div className="w-full space-y-2">
      <label className="cursor-pointer group">
        <input
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
          className="sr-only"
        />
        <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors duration-150">
          <span className="text-violet-400 font-medium group-hover:text-violet-300">
            {uploading ? "Uploading..." : "Choose file"}
          </span>
          {!uploading && (
            <span className="text-zinc-600 text-xs">
              {fileType === "video" ? "MP4, MOV, AVI up to 100MB" : "JPG, PNG, WEBP"}
            </span>
          )}
        </div>
      </label>
 
      {/* Progress bar */}
      {uploading && (
        <div className="space-y-1.5">
          <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500">{progress}% uploaded</p>
        </div>
      )}
 
      {Error && (
        <p className="text-xs text-red-400">{Error}</p>
      )}
    </div>
  );
};

export default FileUpload;
