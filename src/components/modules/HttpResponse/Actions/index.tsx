import React from "react";
import {
  SyncOutlined,
  StopOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { TProviderProps } from "../provider";
import SaveResponse from "./SaveResponse";
import CopyResponse from "./CopyResponse";

type TProps = Pick<
  TProviderProps,
  | "makeRequest"
  | "loading"
  | "toggleEditorExpanded"
  | "cancelRequest"
  | "rawBody"
  | "prettyBody"
  | "filename"
  | "headers"
> & {
  editorExpanded: boolean;
  body: string;
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
            icon={
              props.editorExpanded ? <ShrinkOutlined /> : <ArrowsAltOutlined />
            }
            onClick={props.toggleEditorExpanded}
          />
        </Tooltip>
        <SaveResponse
          headers={props.headers}
          filename={props.filename}
          prettyBody={props.prettyBody}
          rawBody={props.rawBody}
        />
        <CopyResponse
          headers={props.headers}
          prettyBody={props.prettyBody}
          rawBody={props.rawBody}
        />
      </Space>
    </div>
  );
};
export default Actions;
