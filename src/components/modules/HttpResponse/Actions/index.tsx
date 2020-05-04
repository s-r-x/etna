import React from "react";
import {
  SyncOutlined,
  SaveOutlined,
  CopyOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { WebApi } from "@/utils/webapi";
import { TProviderProps } from "../provider";

type TProps = Pick<
  TProviderProps,
  "makeRequest" | "loading" | "toggleEditorExpanded"
> & {
  editorExpanded: boolean;
  body: string;
};
const Actions = (props: TProps) => {
  const onSave = () => {
    WebApi.downloadFile(props.body, "response");
  };
  const onCopy = () => {
    WebApi.copyToClipboard(props.body);
    message.info("Copied to clipboard");
  };
  const onRequest = () => props.makeRequest();
  return (
    <div>
      <Space size="small">
        <Button
          disabled={props.loading}
          icon={<SyncOutlined />}
          loading={props.loading}
          onClick={onRequest}
        />
        <Button
          icon={
            props.editorExpanded ? <ShrinkOutlined /> : <ArrowsAltOutlined />
          }
          onClick={props.toggleEditorExpanded}
        />
        <Button icon={<SaveOutlined />} onClick={onSave} />
        <Button icon={<CopyOutlined />} onClick={onCopy} />
      </Space>
    </div>
  );
};
export default Actions;
