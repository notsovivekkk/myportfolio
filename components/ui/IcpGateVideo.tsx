"use client";

import { useEffect, useRef, useState } from "react";

/* The ICP Gate clip, used instead of the illustration once a file
   exists at public/videos/icp-gate.mp4. Lazy: the src is only set when
   the tile comes within 300px of the screen, so the clip never costs
   anything on a visit that does not scroll to it. Same ratio and
   corners as the Loom tiles. */
export default function IcpGateVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc("/videos/icp-gate.mp4");
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label="ICP Gate in action"
      style={{ aspectRatio: "100 / 64.98194945848375" }}
      className="block w-full rounded-tile bg-frame object-cover"
    />
  );
}
