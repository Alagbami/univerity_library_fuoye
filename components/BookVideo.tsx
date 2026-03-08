"use client";
import React, { useEffect, useState } from "react";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [signedUrl, setSignedUrl] = useState("");

  useEffect(() => {
    fetch(`/api/imagekit/signed-url?path=${encodeURIComponent(videoUrl)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.signedUrl) {
          setSignedUrl(data.signedUrl);
        }
      })
      .catch((err) => console.error("Error fetching signed URL:", err));
  }, [videoUrl]);

  return (
    <video controls className="w-full rounded-xl" src={signedUrl} />
  );
};
export default BookVideo;
