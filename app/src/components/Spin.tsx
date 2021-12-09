import React from "react";
import { Spin as AntdSpin, SpinProps } from "antd";

type TProps = { centered?: boolean } & SpinProps;
const Spin = ({ centered, ...props }: TProps) => {
  if (centered) {
    return (
      <div style={{ textAlign: "center" }}>
        <AntdSpin {...props} />
      </div>
    );
  }
  return <AntdSpin {...props} />;
};
export default Spin;
