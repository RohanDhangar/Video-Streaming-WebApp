"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { useSession } from "next-auth/react";

function uploadMedia() {
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [videoURL, setvideoURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const {data: session} = useSession();

  const handleSubmit = async() => {

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
      })

      const data = await res.json();

      if(!res.ok){
        alert(data.error);
      }
      alert("your video uploaded successfully");
      console.log(data);
      router.push("/");
      
    } catch (error) {
      console.log(error);
    }

  }  

    if(session){
      return(
    <>
      <div>Upload your media</div>
      <input
        type="text"
        placeholder="Enter the video title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter the video description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      choose the thumbnail
      <FileUpload
        onSuccess={(res) => {
          setThumbnailURL(res.url);
        }}
      />
      choose the video
      <FileUpload
        onSuccess={(res) => {
          setvideoURL(res.url);
        }}
      />
      <button type="submit" onClick={handleSubmit}>submit</button>
    </>
      )
    }  

  else{
    return(
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
}

export default uploadMedia;
