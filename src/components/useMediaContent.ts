import { useEffect, useRef } from "react";

export const useMediaContent = () => {
  const videoEl = useRef<HTMLVideoElement>();
  useEffect(() => {
    const recentVideo = videoEl.current;
    return () => {
      recentVideo?.pause();
    };
  });
  return {
    videoEl,
  };
};
