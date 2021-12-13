import React, { useCallback } from "react";
import { Menu } from "antd";
import { TConnectorProps } from "@/domains/http/req/root/connectors/tabs";
import { THTTPBodyMIME } from "@/domains/http/shared/typings";
import { humanReadableMime } from "@/domains/http/shared/utils/human-readable-mime";
import DropdownTab from "@/components/atoms/DropdownTab";

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
            {humanReadableMime("application/json")}
          </Menu.Item>
          <Menu.Item key="application/xml">
            {humanReadableMime("application/xml")}
          </Menu.Item>
          <Menu.Item key="text/html">
            {humanReadableMime("text/html")}
          </Menu.Item>
          <Menu.Item key="text/plain">
            {humanReadableMime("text/plain")}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Key:value">
          <Menu.Item key="application/x-www-form-urlencoded">
            {humanReadableMime("application/x-www-form-urlencoded")}
          </Menu.Item>
          <Menu.Item key="multipart/form-data">
            {humanReadableMime("multipart/form-data")}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g3" title="Other">
          <Menu.Item key="application/graphql">
            {humanReadableMime("application/graphql")}
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
  }, [props.mime, props.changeMime]);
  return (
    <DropdownTab
      title={humanReadableMime(props.mime)}
      disabled={!props.isActive}
      menu={menu}
    />
  );
};

export default BodyTab;
