import React from "react";
import { SaveOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { TProviderProps } from "../provider";
import { WebApi } from "@/utils/webapi";

type TProps = Pick<TProviderProps, "rawBody">;
const Actions = (props: TProps) => {
  const onSave = () => {
    WebApi.downloadFile(props.rawBody, "response");
  };
  const onCopy = () => {
    WebApi.copyToClipboard(props.rawBody);
    message.info("Copied to the clipboard");
  };
  return (
    <div>
      <Space size="small">
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
