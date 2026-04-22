"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Props = { className?: string; height?: number };

/**
 * Renders /logo.png if present, otherwise falls back to the SVG placeholder.
 * Drop the official FB Corp PNG at public/logo.png to take over.
 */
export default function BrandLogo({ className, height = 28 }: Props) {
  const [src, setSrc] = useState("/logo.png");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${site.brand} logo`}
      height={height}
      style={{ height }}
      className={`${className ?? ""} w-auto`}
      onError={() => {
        if (src !== "/logo.svg") setSrc("/logo.svg");
      }}
    />
  );
}
