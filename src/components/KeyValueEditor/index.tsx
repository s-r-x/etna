import React from "react";
import { Button, Space } from "antd";
import Row from "./Row";
import { PlusOutlined } from "@ant-design/icons";
import { TProps } from "@/typings/components/keyValueEditor";

const KeyValueEditor = (props: TProps) => {
  return (
    <Space direction="vertical">
      {props.items.map((item, idx) => (
        <Row
          item={item}
          idx={idx}
          key={item.id}
          onChangeActive={props.onChangeActive}
          onChangeKey={props.onChangeKey}
          onChangeValue={props.onChangeValue}
          onRemove={props.onRemove}
          keyPlaceholder={props.keyPlaceholder}
          valuePlaceholder={props.valuePlaceholder}
          updateByIdx={props.updateByIdx}
        />
      ))}
      <Button
        title={props.addPlaceholder || "Add new"}
        onClick={props.onAdd}
        type="primary"
        block
        icon={<PlusOutlined />}
      ></Button>
    </Space>
  );
};
export default KeyValueEditor;
