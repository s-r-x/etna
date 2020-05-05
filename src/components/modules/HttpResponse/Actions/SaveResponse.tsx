import React, { useCallback } from "react";
import { Menu, Dropdown, Button } from "antd";
import { WebApi } from "@/utils/webapi";
import { TProviderProps } from "../provider";

import { SaveOutlined, SaveFilled } from "@ant-design/icons";

type TProps = Pick<TProviderProps, "prettyBody" | "rawBody" | "filename">;
const SaveResponse = (props: TProps) => {
  const menu = useCallback(() => {
    const onSave = (pretty: boolean) => {
      if (pretty) {
        WebApi.downloadFile(props.prettyBody, props.filename);
      } else {
        WebApi.downloadFile(props.rawBody, props.filename);
      }
    };
    return (
      <Menu>
        <Menu.Item onClick={() => onSave(false)} icon={<SaveOutlined />}>
          Raw
        </Menu.Item>
        <Menu.Item onClick={() => onSave(true)} icon={<SaveFilled />}>
          Pretty
        </Menu.Item>
      </Menu>
    );
  }, [props.prettyBody, props.rawBody, props.filename]);
  return (
    <Dropdown trigger={["click"]} overlay={menu}>
      <Button icon={<SaveOutlined />} />
    </Dropdown>
  );
};
export default SaveResponse;
