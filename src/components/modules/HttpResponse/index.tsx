import React from "react";
import { Empty } from "antd";
import { TProviderProps, provide } from "./provider";
import Stats from "./Stats";
import cls from "./index.less";
import Actions from "./Actions";
import BodyRenderer from "./BodyRenderer";
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
          isBinary={props.response?.isBinary}
          category={props.category}
          isPrettyBodySupported={props.isPrettyBodySupported}
          headers={props.headers}
          filename={props.filename}
          cancelRequest={props.cancelRequest}
          editorExpanded={props.editorOpts.expanded}
          toggleEditorExpanded={props.toggleEditorExpanded}
          loading={props.loading}
          makeRequest={props.makeRequest}
          rawBody={props.rawBody}
          prettyBody={props.prettyBody}
        />
      </div>
      <div className={cls.content}>
        <Tabs
          headersLength={props.headers.length}
          Body={
            <BodyRenderer
              isBinary={props.response?.isBinary}
              isPdf={props.isPdf}
              isPrettyBodySupported={props.isPrettyBodySupported}
              isImage={props.isImage}
              changeEditorFormat={props.changeEditorFormat}
              editorOpts={props.editorOpts}
              responseType={props.responseType}
              prettyBody={props.prettyBody}
              rawBody={props.rawBody}
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
