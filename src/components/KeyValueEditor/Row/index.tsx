import React, { memo, useCallback } from "react";
import { Input, Button, Checkbox, Space } from "antd";
import cls from "./index.less";
import { DeleteOutlined } from "@ant-design/icons";
import {
  TProps as TRootProps,
  TItem,
} from "@/typings/components/keyValueEditor";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

type TProps = Pick<
  TRootProps,
  | "onChangeActive"
  | "onChangeKey"
  | "onChangeValue"
  | "onRemove"
  | "updateByIdx"
  | "keyPlaceholder"
  | "valuePlaceholder"
> & {
  idx: number;
  item: TItem;
};
const Row = memo((props: TProps) => {
  const { item } = props;
  const onChangeActive = useCallback(
    (e: CheckboxChangeEvent) => {
      props.onChangeActive({
        active: e.target.checked,
        id: props.updateByIdx ? props.idx : item.id,
      });
    },
    [item.id, props.updateByIdx, props.idx]
  );
  const onRemove = useCallback(() => {
    props.onRemove(props.updateByIdx ? props.idx : item.id);
  }, [props.idx, props.updateByIdx, item.id]);
  const onChangeKey = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChangeKey({
        id: props.updateByIdx ? props.idx : item.id,
        key: e.target.value,
      });
    },
    [props.idx, props.updateByIdx, item.id]
  );
  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChangeValue({
        id: props.updateByIdx ? props.idx : item.id,
        value: e.target.value,
      });
    },
    [props.idx, props.updateByIdx, item.id]
  );
  const keyPlaceholder = `${props.keyPlaceholder || "Key"} ${props.idx + 1}`;
  const valuePlaceholder = `${props.valuePlaceholder || "Value"} ${
    props.idx + 1
  }`;
  return (
    <div className={cls.container}>
      <div className={cls.utils}>
        <Space size="small">
          {props.onChangeActive && (
            <Checkbox checked={item.active} onChange={onChangeActive} />
          )}
          <Button
            type="primary"
            danger
            title="Remove"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={onRemove}
          />
        </Space>
      </div>
      <Space size="small">
        <Input
          placeholder={keyPlaceholder}
          value={item.key}
          onChange={onChangeKey}
        />
        <Input
          placeholder={valuePlaceholder}
          value={item.value}
          onChange={onChangeValue}
        />
      </Space>
    </div>
  );
});
Row.displayName = "KeyValueEditorRow";
export default Row;
