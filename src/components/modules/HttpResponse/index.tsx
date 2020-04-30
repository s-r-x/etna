import React from "react";
import { Empty } from "antd";
import { TProviderProps, provide } from "./provider";
import Stats from "./Stats";
import cls from "./index.less";
import Actions from "./Actions";
//import CodeEditor from '@/components/CodeEditor';

const HttpResponse = (props: TProviderProps) => {
  const { response } = props;
  if (!response) {
    return <Empty />;
  }
  return (
    <div>
      <div className={cls.topBar}>
        <Stats response={response} responseSize={props.responseSize} />
        <Actions body={props.response.data} />
      </div>
    </div>
  );
};

export default provide(HttpResponse);
