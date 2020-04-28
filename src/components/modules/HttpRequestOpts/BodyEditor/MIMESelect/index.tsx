import React from "react";
import { THTTPBodyMIME } from "@/typings/http";
import { HTTP_MIME_TYPES } from "@/misc/http";
import { Select } from "antd";
const { Option } = Select;

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
      {HTTP_MIME_TYPES.map((type) => (
        <Option key={type} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  );
};
export default MIMESelect;
