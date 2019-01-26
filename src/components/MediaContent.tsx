import * as React from "react";
import { isImage, isVideo } from "../media/mediaType";

export const MediaContent = ({ media }) =>
  isImage(media) ? (
    <img className="photo" src={media} />
  ) : (
    isVideo(media) && (
      <video className="video" autoPlay controls>
        <source src={media} />
      </video>
    )
  );
