import React, { useCallback } from "react";
import { Menu, Dropdown, Button, Tooltip } from "antd";
import { WebApi } from "@/utils/webapi";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { TProviderProps } from "../provider";

import { SaveOutlined, SaveFilled, BarsOutlined } from "@ant-design/icons";

type TProps = Pick<
  TProviderProps,
  "prettyBody" | "rawBody" | "filename" | "headers" | "isPrettyBodySupported"
>;
const SaveResponse = (props: TProps) => {
  const menu = useCallback(() => {
    const onSaveBody = (pretty: boolean) => {
      if (pretty) {
        WebApi.downloadFile(props.prettyBody, props.filename);
      } else {
        WebApi.downloadFile(props.rawBody, props.filename);
      }
    };
    const onSaveHeaders = () => {
      const pretty = CodeFormatter.formatHeaders(props.headers);
      WebApi.downloadFile(pretty, "headers");
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
    props.filename,
    props.headers,
    props.isPrettyBodySupported,
  ]);
  return (
    <Tooltip title="Save">
      <Dropdown overlay={menu}>
        <Button icon={<SaveOutlined />} />
      </Dropdown>
    </Tooltip>
  );
};
export default SaveResponse;
