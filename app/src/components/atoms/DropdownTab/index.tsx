import React from "react";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

type TProps = {
  title: any;
  disabled: boolean;
  menu: React.ReactElement | (() => React.ReactElement);
};
const DropdownTab: React.FC<TProps> = (props) => {
  return (
    <Dropdown
      trigger={["click"]}
      disabled={props.disabled}
      overlay={props.menu}
    >
      <div>
        <span>{props.title}</span>{" "}
        <DownOutlined style={{ marginRight: "0px" }} />
      </div>
    </Dropdown>
  );
};

export default DropdownTab;
