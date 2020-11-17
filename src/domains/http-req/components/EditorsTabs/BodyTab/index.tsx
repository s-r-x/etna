import React, { useCallback } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TConnectorProps } from "@/domains/http-req/connectors/tabs";
import { THTTPBodyMIME } from "@/typings/http";
import { MimeService } from "@/services/mime";

type TProps = Pick<TConnectorProps, "mime" | "changeMime"> & {
  isActive: boolean;
};
const BodyTab = (props: TProps) => {
  const menu = useCallback(() => {
    return (
      <Menu
        onClick={({ key }) => props.changeMime(key as THTTPBodyMIME)}
        selectedKeys={[props.mime]}
      >
        <Menu.ItemGroup key="g1" title="Text">
          <Menu.Item key="application/json">
            {MimeService.formatHR("application/json")}
          </Menu.Item>
          <Menu.Item key="application/xml">
            {MimeService.formatHR("application/xml")}
          </Menu.Item>
          <Menu.Item key="text/html">
            {MimeService.formatHR("text/html")}
          </Menu.Item>
          <Menu.Item key="text/plain">
            {MimeService.formatHR("text/plain")}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Key:value">
          <Menu.Item key="application/x-www-form-urlencoded">
            {MimeService.formatHR("application/x-www-form-urlencoded")}
          </Menu.Item>
          <Menu.Item key="multipart/form-data">
            {MimeService.formatHR("multipart/form-data")}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g3" title="Other">
          <Menu.Item key="application/graphql">
            {MimeService.formatHR("application/graphql")}
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  }, [props.mime, props.changeMime]);
  return (
    <Dropdown trigger={["click"]} disabled={!props.isActive} overlay={menu}>
      <div>
        <span>{MimeService.formatHR(props.mime)}</span>{" "}
        <DownOutlined style={{ marginRight: "0px" }} />
      </div>
    </Dropdown>
  );
};

export default BodyTab;
