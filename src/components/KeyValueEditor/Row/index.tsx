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
        id: props.idx,
      });
    },
    [props.idx]
  );
  const onRemove = useCallback(() => {
    props.onRemove(props.idx);
  }, [props.idx]);
  const onChangeKey = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChangeKey({
        id: props.idx,
        key: e.target.value,
      });
    },
    [props.idx]
  );
  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChangeValue({
        id: props.idx,
        value: e.target.value,
      });
    },
    [props.idx]
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
      <Space className={cls.inputs} size="small">
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
