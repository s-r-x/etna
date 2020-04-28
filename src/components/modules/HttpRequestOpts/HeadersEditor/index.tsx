import React from "react";
import { provide, TProviderProps } from "./provider";
import { Button, Space } from "antd";
import Row from "./Row";
import { PlusOutlined } from "@ant-design/icons";

const HeadersEditor = (props: TProviderProps) => {
  return (
    <div>
      <Space direction="vertical">
        {props.headers.map((header, idx) => (
          <Row
            item={header}
            idx={idx}
            key={header.id}
            changeHeaderActive={props.changeHeaderActive}
            changeHeaderKey={props.changeHeaderKey}
            changeHeaderValue={props.changeHeaderValue}
            removeHeader={props.removeHeader}
          />
        ))}
        <Button
          title="Add header"
          onClick={props.addHeader}
          type="primary"
          block
          // @ts-ignore
          icon={<PlusOutlined />}
        ></Button>
      </Space>
    </div>
  );
};
export default provide(HeadersEditor);
