import React from "react";
import { Empty } from "antd";
import { TProviderProps, provide } from "./provider";
import Stats from "./Stats";
import cls from "./index.less";
import Actions from "./Actions";
import BodyViewer from "./BodyViewer";
import Tabs from "./Tabs";
import Headers from "./Headers";

const HttpResponse = (props: TProviderProps) => {
  const { response } = props;
  if (!response) {
    return <Empty />;
  }
  return (
    <div>
      <div className={cls.topBar}>
        <Stats response={response} responseSize={props.responseSize} />
        <Actions
          editorExpanded={props.editorOpts.expanded}
          toggleEditorExpanded={props.toggleEditorExpanded}
          loading={props.loading}
          makeRequest={props.makeRequest}
          body={props.response.data}
        />
      </div>
      <div className={cls.content}>
        <Tabs
          Body={
            <BodyViewer
              responseType={props.responseType}
              expanded={props.editorOpts.expanded}
              body={props.prettyBody}
            />
          }
          Headers={<Headers />}
          category={props.category}
          changeCategory={props.changeCategory}
        />
      </div>
    </div>
  );
};

export default provide(HttpResponse);
