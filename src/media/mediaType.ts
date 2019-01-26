export const isImage: isMediaType = filename =>
  Boolean(filename.match(/\.(jpe?g|png|gif|bmp|webp)$/i));

export const isVideo: isMediaType = filename =>
  Boolean(filename.match(/\.(mp4|mov|avi|3gp|webm|m4v)$/i));
