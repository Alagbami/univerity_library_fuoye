"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BookCoverSvg from "@/components/BookCoverSvg";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  const [signedUrl, setSignedUrl] = useState(coverImage);

  useEffect(() => {
    if (coverImage.startsWith("http")) {
      setSignedUrl(coverImage);
    } else {
      fetch(`/api/imagekit/signed-url?path=${encodeURIComponent(coverImage)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.signedUrl) {
            setSignedUrl(data.signedUrl);
          }
        })
        .catch((err) => console.error("Error fetching signed URL:", err));
    }
  }, [coverImage]);

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <img
          src={signedUrl}
          alt="Book cover"
          className="w-full h-full rounded-sm object-fill"
          loading="lazy"
        />
      </div>
    </div>
  );
};;
export default BookCover;
