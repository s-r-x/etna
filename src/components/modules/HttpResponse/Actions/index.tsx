import React from "react";
import { SyncOutlined, SaveOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { WebApi } from "@/utils/webapi";
import { TProviderProps } from "../provider";

type TProps = Pick<TProviderProps, "makeRequest"> & {
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
        <Button icon={<SyncOutlined />} onClick={onRequest}>
          Send Again
        </Button>
        <Button icon={<SaveOutlined />} onClick={onSave}>
          Save
        </Button>
        <Button icon={<CopyOutlined />} onClick={onCopy}>
          Copy
        </Button>
      </Space>
    </div>
  );
};
export default Actions;
