import React, { useCallback } from "react";
import { Menu, Dropdown, Button, Tooltip, message } from "antd";
import { WebApi } from "@/utils/webapi";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { TConnectorProps } from "../../connectors";

import {
  SaveOutlined,
  SaveFilled,
  BarsOutlined,
  CopyOutlined,
} from "@ant-design/icons";

type TProps = Pick<
  TConnectorProps,
  "prettyBody" | "rawBody" | "headers" | "isPrettyBodySupported"
>;
const CopyResponse = (props: TProps) => {
  const menu = useCallback(() => {
    const onSaveBody = (pretty: boolean) => {
      if (pretty) {
        WebApi.copyToClipboard(props.prettyBody);
      } else {
        WebApi.copyToClipboard(props.rawBody);
      }
      message.info("Copied to the clipboard");
    };
    const onSaveHeaders = () => {
      const pretty = CodeFormatter.formatHeaders(props.headers);
      WebApi.copyToClipboard(pretty);
      message.info("Copied to the clipboard");
    };
    return (
      <Menu>
        <Menu.Item onClick={() => onSaveBody(false)} icon={<SaveOutlined />}>
          Raw Body
        </Menu.Item>
        {props.isPrettyBodySupported && (
          <Menu.Item onClick={() => onSaveBody(true)} icon={<SaveFilled />}>
            Pretty Body
          </Menu.Item>
        )}
        <Menu.Item onClick={onSaveHeaders} icon={<BarsOutlined />}>
          Headers
        </Menu.Item>
      </Menu>
    );
  }, [
    props.prettyBody,
    props.rawBody,
    props.headers,
    props.isPrettyBodySupported,
  ]);
  return (
    <Tooltip title="Copy to clipboard">
      <Dropdown overlay={menu}>
        <Button icon={<CopyOutlined />} />
      </Dropdown>
    </Tooltip>
  );
};
export default CopyResponse;
