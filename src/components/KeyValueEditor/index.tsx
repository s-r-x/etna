import React, { useCallback } from "react";
import { Button, Space } from "antd";
import Row from "./Row";
import { PlusOutlined } from "@ant-design/icons";
import { TProps } from "@/typings/components/keyValueEditor";

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
          key={props.useIdxAsKey ? idx : item.id}
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
        onClick={onAdd}
        type="primary"
        block
        icon={<PlusOutlined />}
      ></Button>
    </Space>
  );
};
export default KeyValueEditor;
