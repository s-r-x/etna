import React, { useCallback } from "react";
import { Button, Space } from "antd";
import Row from "./Row";
import { PlusOutlined } from "@ant-design/icons";
import { TProps } from "./typings";

const KeyValueEditor = (props: TProps) => {
  const onAdd = useCallback(() => {
    props.onAdd();
  }, [props.onAdd]);
  return (
    <Space direction="vertical" style={{ display: "flex" }}>
      {props.items.map((item, idx) => (
        <Row
          item={item}
          idx={idx}
          key={idx}
          onChangeActive={props.onChangeActive}
          onChangeKey={props.onChangeKey}
          onChangeValue={props.onChangeValue}
          onRemove={props.onRemove}
          valueRenderer={props.valueRenderer}
          keyPlaceholder={props.keyPlaceholder}
          valuePlaceholder={props.valuePlaceholder}
        />
      ))}
      <Button
        title={props.addPlaceholder || "Add new"}
        onClick={onAdd}
        type="primary"
        block
        icon={<PlusOutlined />}
      >{props.addTitle}</Button>
    </Space>
  );
};
export default KeyValueEditor;
