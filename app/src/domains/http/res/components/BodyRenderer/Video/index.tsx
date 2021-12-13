import React from "react";

type TProps = {
  body: string;
};

const VideoRenderer = (props: TProps) => {
  return (
    <div>
      <video controls src={props.body} loop />
    </div>
  );
};
export default VideoRenderer;
