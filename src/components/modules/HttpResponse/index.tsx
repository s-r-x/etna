import React from "react";
import { Empty } from "antd";
import { TProviderProps, provide } from "./provider";

const HttpResponse = (props: TProviderProps) => {
  if (!props.response) {
    return <Empty />;
  }
  return <div>got some response</div>;
};

export default provide(HttpResponse);
