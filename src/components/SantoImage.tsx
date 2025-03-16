"use client";

import Image from "next/image";
import { useState } from "react";

interface SantoImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SantoImage({ src, alt, className }: SantoImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc("/placeholder.svg?height=600&width=400");
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className || "object-cover rounded-lg"}
      onError={handleError}
      priority
    />
  );
} 