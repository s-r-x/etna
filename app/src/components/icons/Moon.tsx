import Icon from "@ant-design/icons";
import React from "react";

const MoonSvg = (props: any) => (
  <svg x="0px" y="0px" viewBox="0 0 100 100" {...props}>
    <path d="M95,50c0,24.7-20.2,44.8-45,44.8c-23.7,0-43.4-18.4-45-41.9c-0.1-1.2,0.6-2.4,1.8-2.9c1.1-0.5,2.5-0.3,3.4,0.6  c5.9,5.9,13.1,9.1,20.3,9.1c16,0,28.9-13,28.9-28.9c0-7.3-3.2-14.5-9.1-20.4c-0.9-0.9-1.1-2.2-0.6-3.3c0.5-1.1,1.7-1.8,2.9-1.8  C76.4,6.6,95,26.3,95,50z"></path>
  </svg>
);

const MoonIcon = (props: React.ComponentProps<typeof Icon>) => (
  <Icon component={MoonSvg} {...props} />
);

export default MoonIcon;
