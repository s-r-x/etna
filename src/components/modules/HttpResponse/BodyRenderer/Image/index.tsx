import React from "react";

type TProps = {
  body: string;
};
const ImageRenderer = (props: TProps) => {
  return (
    <img
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
      src={props.body}
      alt="response"
    />
  );
};

export default ImageRenderer;
