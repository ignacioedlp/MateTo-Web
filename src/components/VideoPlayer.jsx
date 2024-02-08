import React from 'react';

const VideoPlayer = ({ src }) => {
  return (

    <video
      src={src}
      controls
      className="h-[750px] max-w-full border-2 border-gray-300"
    />
  );
};

export default VideoPlayer;