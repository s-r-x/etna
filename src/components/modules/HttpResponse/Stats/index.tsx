import React from "react";
import cls from "./index.less";
import ms from "pretty-ms";
import pb from "pretty-bytes";

type TProps = {
  responseTime: number;
  status: number;
  size: number;
};

const Stats = (props: TProps) => {
  return (
    <div className={cls.container}>
      <div className={cls.sect}>
        <span>Status: </span>
        <span>{props.status}</span>
      </div>
      <div className={cls.sect}>
        <span>Time: </span>
        <span>{ms(props.responseTime)}</span>
      </div>
      <div className={cls.sect}>
        <span>Size: </span>
        <span>{pb(props.size)}</span>
      </div>
    </div>
  );
};

export default Stats;
