"use client";

import React, { useEffect, useState } from "react";

// "use client"; import React from 'react' 
// function ListVideo() 
// { 
// const getVideos = async() => { 
// const videos = await fetch("/api/video") 
// .then(data => data.json()) 
// .catch(error => console.log(error)); 
// return videos; }
//  const videos = getVideos(); console.log(videos);
//  return ( <></> ) } export default ListVideo

type Video = {
  _id: string;
  title: string;
  description: string;
  videoURL: string;
  thumbnailURL: string;
};

function ListVideo() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetch("/api/video").then((res) => res.json());

      console.log(data);
      setVideos(data);
    };

    getVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <img src={video.thumbnailURL} />
          <video src={video.videoURL} />
        </div>
      ))}
    </div>
  );
}

export default ListVideo;
