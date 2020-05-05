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
          filename={props.filename}
          cancelRequest={props.cancelRequest}
          editorExpanded={props.editorOpts.expanded}
          toggleEditorExpanded={props.toggleEditorExpanded}
          loading={props.loading}
          makeRequest={props.makeRequest}
          rawBody={props.rawBody}
          prettyBody={props.prettyBody}
          body={props.response.data}
        />
      </div>
      <div className={cls.content}>
        <Tabs
          headersLength={props.headers.length}
          Body={
            <BodyViewer
              responseType={props.responseType}
              expanded={props.editorOpts.expanded}
              body={props.prettyBody}
            />
          }
          Headers={<Headers headers={props.headers} />}
          category={props.category}
          changeCategory={props.changeCategory}
        />
      </div>
    </div>
  );
};

export default provide(HttpResponse);
