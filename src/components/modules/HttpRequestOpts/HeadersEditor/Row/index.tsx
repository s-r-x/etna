import React, { memo } from "react";
import { Input, Button, Checkbox, Space } from "antd";
import cls from "./index.less";
import { THeader } from "@/typings/store/httpRequest";
import { TProviderProps } from "../provider";
import { DeleteOutlined } from "@ant-design/icons";

type TProps = {
  item: THeader;
  idx: number;
} & Pick<
  TProviderProps,
  | "changeHeaderActive"
  | "changeHeaderKey"
  | "changeHeaderValue"
  | "removeHeader"
>;
const Row = memo((props: TProps) => {
  const { item } = props;
  return (
    <div className={cls.container}>
      <div className={cls.utils}>
        <Space size="small">
          <Checkbox
            checked={item.active}
            onChange={(e) =>
              props.changeHeaderActive({
                idx: props.idx,
                active: e.target.checked,
              })
            }
          />
          <Button
            type="primary"
            danger
            title="Remove header"
            shape="circle"
            // @ts-ignore
            icon={<DeleteOutlined />}
            onClick={() => props.removeHeader(props.idx)}
          />
        </Space>
      </div>
      <Space size="small">
        <Input
          placeholder="Header"
          value={item.key}
          onChange={(e) =>
            props.changeHeaderKey({
              idx: props.idx,
              key: e.target.value,
            })
          }
        />
        <Input
          placeholder="Value"
          value={item.value}
          onChange={(e) =>
            props.changeHeaderValue({
              idx: props.idx,
              value: e.target.value,
            })
          }
        />
      </Space>
    </div>
  );
});
Row.displayName = "HeaderEditorRow";
export default Row;
