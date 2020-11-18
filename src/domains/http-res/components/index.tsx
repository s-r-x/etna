import React from "react";
import { Empty } from "antd";
import { TConnectorProps, connector } from "../connectors";
import Stats from "./Stats";
import Actions from "./Actions";
import BodyRenderer from "./BodyRenderer";
import Tabs from "./Tabs";
import Headers from "./Headers";
import * as S from "./styled";

const HttpResponse = (props: TConnectorProps) => {
  const { response } = props;
  if (!response) {
    return (
      <S.Card>
        <Empty />
      </S.Card>
    );
  }
  return (
    <S.Card>
      <S.TopBar>
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
      </S.TopBar>
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
    </S.Card>
  );
};

export default connector(HttpResponse);
