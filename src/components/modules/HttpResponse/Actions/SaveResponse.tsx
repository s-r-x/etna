import React, { useCallback } from "react";
import { Menu, Dropdown, Button, Tooltip } from "antd";
import { WebApi } from "@/utils/webapi";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { TProviderProps } from "../provider";

import { SaveOutlined, SaveFilled, BarsOutlined } from "@ant-design/icons";

type TProps = Pick<
  TProviderProps,
  "prettyBody" | "rawBody" | "filename" | "headers" | "isPrettyBodySupported"
> & {
  isBinary: boolean;
};
const SaveResponse = (props: TProps) => {
  const menu = useCallback(() => {
    const onSaveBody = (pretty: boolean) => {
      const content = pretty ? props.prettyBody : props.rawBody;
      WebApi.downloadFile(content, props.filename, {
        shouldCreateBlob: !props.isBinary,
      });
    };
    const onSaveHeaders = () => {
      const prettyHeaders = CodeFormatter.formatHeaders(props.headers);
      console.log(prettyHeaders);
      WebApi.downloadFile(prettyHeaders, "headers.txt");
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
    props.isBinary,
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
