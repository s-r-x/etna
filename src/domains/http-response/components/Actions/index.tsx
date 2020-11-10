import React from "react";
import {
  SyncOutlined,
  StopOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { TConnectorProps } from "../../connectors";
import SaveResponse from "./SaveResponse";
import CopyResponse from "./CopyResponse";

type TProps = Pick<
  TConnectorProps,
  | "makeRequest"
  | "loading"
  | "toggleEditorExpanded"
  | "cancelRequest"
  | "rawBody"
  | "prettyBody"
  | "filename"
  | "headers"
  | "isPrettyBodySupported"
  | "category"
> & {
  editorExpanded: boolean;
  isBinary: boolean;
};
const Actions = (props: TProps) => {
  const onRequest = () => props.makeRequest();
  return (
    <div>
      <Space size="small">
        <Tooltip title="Cancel request">
          <Button
            disabled={!props.loading}
            icon={<StopOutlined />}
            danger
            onClick={props.cancelRequest}
          />
        </Tooltip>
        <Tooltip title="Send again">
          <Button
            disabled={props.loading}
            icon={<SyncOutlined />}
            loading={props.loading}
            onClick={onRequest}
          />
        </Tooltip>
        <Tooltip
          title={
            props.editorExpanded
              ? "Shrink response body"
              : "Expand response body"
          }
        >
          <Button
            disabled={props.category !== "body"}
            icon={
              props.editorExpanded ? <ShrinkOutlined /> : <ArrowsAltOutlined />
            }
            onClick={props.toggleEditorExpanded}
          />
        </Tooltip>
        <SaveResponse
          isBinary={props.isBinary}
          isPrettyBodySupported={props.isPrettyBodySupported}
          headers={props.headers}
          filename={props.filename}
          prettyBody={props.prettyBody}
          rawBody={props.rawBody}
        />
        <CopyResponse
          isPrettyBodySupported={props.isPrettyBodySupported}
          headers={props.headers}
          prettyBody={props.prettyBody}
          rawBody={props.rawBody}
        />
      </Space>
    </div>
  );
};
export default Actions;
