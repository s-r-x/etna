import React from "react";
import { Empty } from "antd";
import { TConnectorProps, connector } from "../connectors";
import Stats from "./Stats";
import Actions from "./Actions";
import BodyRenderer from "./BodyRenderer";
import Tabs from "./Tabs";
import Headers from "./Headers";
import * as S from "./styled";
import FullHeightCard from "@/components/atoms/FullHeightCard";

const HttpResponse = (props: TConnectorProps) => {
  const { response } = props;
  if (!response) {
    return (
      <FullHeightCard>
        <Empty />
      </FullHeightCard>
    );
  }
  return (
    <FullHeightCard>
      <S.TopBar>
        <Actions
          responseType={props.responseType}
          isBinary={props.response?.isBinary}
          category={props.category}
          isPrettyBodySupported={props.isPrettyBodySupported}
          headers={props.headers}
          filename={props.filename}
          cancelRequest={props.cancelRequest}
          loading={props.loading}
          makeRequest={props.makeRequest}
          rawBody={props.rawBody}
          prettyBody={props.prettyBody}
        />
        <Stats />
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
    </FullHeightCard>
  );
};

export default connector(HttpResponse);
