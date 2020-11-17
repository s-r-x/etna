import React from "react";
import { Empty } from "antd";
import { TConnectorProps, connector } from "../connectors";
import Stats from "./Stats";
import cls from "./index.less";
import Actions from "./Actions";
import BodyRenderer from "./BodyRenderer";
import Tabs from "./Tabs";
import Headers from "./Headers";
import { Card } from "antd";

const HttpResponse = (props: TConnectorProps) => {
  const { response } = props;
  if (!response) {
    return (
      <Card className={cls.card}>
        <Empty />
      </Card>
    );
  }
  return (
    <Card id="res-card" className={cls.card}>
      <div className={cls.topBar}>
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
        <Stats response={response} responseSize={props.responseSize} />
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
    </Card>
  );
};

export default connector(HttpResponse);
