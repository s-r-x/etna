import React from "react";

type TProps = {
  svg: string;
};
// TODO:: show raw svg in text editor option
const SvgRenderer = ({ svg }: TProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svg,
      }}
    />
  );
};

export default SvgRenderer;
