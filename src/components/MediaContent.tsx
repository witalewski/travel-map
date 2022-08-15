import * as React from "react";
import { isImage, isVideo } from "../media/mediaType";
import { useMediaContent } from "./useMediaContent";

export const MediaContent = ({ media }) => {
  const { videoEl } = useMediaContent();
  if (isImage(media)) {
    return <img className="photo" src={media} />;
  }

  if (isVideo(media)) {
    return (
      <video ref={videoEl} className="video" autoPlay controls>
        <source src={media} />
      </video>
    );
  }

  return null;
};
