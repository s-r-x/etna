import React from "react";
import { Empty } from "antd";
import { TProviderProps, provide } from "./provider";
import Stats from "./Stats";

const HttpResponse = (props: TProviderProps) => {
  const { response } = props;
  if (!response) {
    return <Empty />;
  }
  return (
    <div>
      <Stats
        size={props.responseSize}
        responseTime={response.responseTime}
        status={response.status}
      />
    </div>
  );
};

export default provide(HttpResponse);
