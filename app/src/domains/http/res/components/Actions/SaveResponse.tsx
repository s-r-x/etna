import React, { useCallback } from "react";
import { Menu, Dropdown, Button, Tooltip } from "antd";
import { WebApi } from "@/utils/webapi";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { TConnectorProps } from "../../connectors";
import { SaveOutlined, SaveFilled, BarsOutlined } from "@ant-design/icons";

type TProps = Pick<
  TConnectorProps,
  | "prettyBody"
  | "rawBody"
  | "filename"
  | "headers"
  | "isPrettyBodySupported"
  | "responseType"
> & {
  isBinary: boolean;
};
const SaveResponse = (props: TProps) => {
  const menu = useCallback(() => {
    const onSaveBody = (pretty: boolean) => {
      if (props.isBinary) {
        WebApi.downloadFile(props.rawBody, props.filename);
      } else {
        const content = new Blob([pretty ? props.prettyBody : props.rawBody], {
          type: props.responseType,
        });
        WebApi.downloadFile(content, props.filename);
      }
    };
    const onSaveHeaders = () => {
      const prettyHeaders = CodeFormatter.formatHeaders(props.headers);
      const blob = new Blob([prettyHeaders], {
        type: "text/plain;charset=utf-8",
      });
      WebApi.downloadFile(blob, "headers.txt");
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
    props.responseType,
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
