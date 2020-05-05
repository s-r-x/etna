import React, { useCallback } from "react";
import { Menu, Dropdown, Button } from "antd";
import { WebApi } from "@/utils/webapi";
import { TProviderProps } from "../provider";

import { SaveOutlined, SaveFilled, BarsOutlined } from "@ant-design/icons";

type TProps = Pick<
  TProviderProps,
  "prettyBody" | "rawBody" | "filename" | "headers"
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
      const prettyHeaders = props.headers
        .map(({ key, value }) => `${key}: ${value}`)
        .join("\n");
      WebApi.downloadFile(prettyHeaders, "headers");
    };
    return (
      <Menu>
        <Menu.Item onClick={() => onSaveBody(false)} icon={<SaveOutlined />}>
          Raw Body
        </Menu.Item>
        <Menu.Item onClick={() => onSaveBody(true)} icon={<SaveFilled />}>
          Pretty Body
        </Menu.Item>
        <Menu.Item onClick={onSaveHeaders} icon={<BarsOutlined />}>
          Headers
        </Menu.Item>
      </Menu>
    );
  }, [props.prettyBody, props.rawBody, props.filename, props.headers]);
  return (
    <Dropdown trigger={["click"]} overlay={menu}>
      <Button icon={<SaveOutlined />} />
    </Dropdown>
  );
};
export default SaveResponse;
