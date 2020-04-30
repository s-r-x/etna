import React from "react";
import { Empty } from "antd";
import { TProviderProps, provide } from "./provider";
import Stats from "./Stats";
import cls from "./index.less";
import Actions from "./Actions";

const HttpResponse = (props: TProviderProps) => {
  const { response } = props;
  if (!response) {
    return <Empty />;
  }
  return (
    <div>
      <div className={cls.topBar}>
        <Stats
          size={props.responseSize}
          responseTime={response.responseTime}
          status={response.status}
        />
        <Actions rawBody={props.rawBody} />
      </div>
    </div>
  );
};

export default provide(HttpResponse);
