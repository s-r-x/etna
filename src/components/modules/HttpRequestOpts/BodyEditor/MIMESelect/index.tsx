import React from "react";
import { THTTPBodyMIME } from "@/typings/http";
import { Select } from "antd";
const { Option, OptGroup } = Select;

type TProps = {
  value: THTTPBodyMIME;
  onChange(val: THTTPBodyMIME): void;
};
const MIMESelect = (props: TProps) => {
  return (
    <Select
      value={props.value}
      style={{ width: 250 }}
      onChange={props.onChange}
    >
      <OptGroup label="Text">
        <Option value="application/json">JSON</Option>
        <Option value="application/xml">XML</Option>
        <Option value="text/html">HTML</Option>
        <Option value="text/plain">Plain text</Option>
      </OptGroup>
      <OptGroup label="Key/value">
        <Option value="application/x-www-form-urlencoded">
          Form urlencoded
        </Option>
        <Option value="multipart/form-data">Multipart form-data</Option>
      </OptGroup>
      <OptGroup label="Misc">
        <Option value="binary">Binary</Option>
      </OptGroup>
    </Select>
  );
};
export default MIMESelect;
