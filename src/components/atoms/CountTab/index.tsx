import React from "react";
import { Badge } from "antd";
import { BADGE_COLOR } from "@/misc/color";

type TProps = {
  count: number;
  title: string;
};
const CountTab = (props: TProps) => (
  <div
    style={{
      paddingRight: "25px",
    }}
  >
    <Badge
      showZero
      style={{
        backgroundColor: BADGE_COLOR,
      }}
      offset={[17, 1]}
      count={props.count}
    >
      {props.title}
    </Badge>
  </div>
);

export default CountTab;
