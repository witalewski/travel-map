import * as React from "react";
import { isImage, isVideo } from "../media/mediaType";
import { useMediaContent } from "./useMediaContent";

export const MediaContent = ({ media }) => {
  if (isImage(media)) {
    return <img className="photo" src={media} />;
  }

  if (isVideo(media)) {
    return (
      <video className="video" autoPlay controls>
        <source src={media} />
      </video>
    );
  }

  return null;
};
