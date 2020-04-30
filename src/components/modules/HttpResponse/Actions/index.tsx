import React from "react";
import { SaveOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { WebApi } from "@/utils/webapi";

type TProps = {
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
