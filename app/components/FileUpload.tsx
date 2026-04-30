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
            onProgress(Math.round(percent));
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

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading....</span>}
    </>
  );
};

export default FileUpload;
