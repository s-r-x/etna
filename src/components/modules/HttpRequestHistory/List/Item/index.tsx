import React, { memo } from "react";
import { ListChildComponentProps } from "react-window";
import { TProviderProps } from "../../provider";
import cls from "./index.less";
import { Tag, Tooltip, Button, Space } from "antd";
import day from "dayjs";
import ms from "pretty-ms";
import {
  ClockCircleFilled,
  CalendarFilled,
  SyncOutlined,
  DeleteFilled,
} from "@ant-design/icons";

type TData = Pick<TProviderProps, "history">;
const SearchItem = memo((props: ListChildComponentProps) => {
  const data: TData = props.data;
  const item = data.history[props.index];
  return (
    <div className={cls.container} style={props.style}>
      <div className={cls.topStats}>
        <Tag style={{ marginRight: "5px" }} color="magenta">
          {item.method}
        </Tag>
        <Tag color="green">{item.status}</Tag>
        <div className={cls.responseTime}>
          <ClockCircleFilled />
          <span style={{ marginLeft: "5px" }}>{ms(item.wait)}</span>
        </div>
        <div className={cls.date}>
          <CalendarFilled />
          <span style={{ marginLeft: "5px" }}>
            {day(item.date).format("MM-DD-YYYY HH:mm")}
          </span>
        </div>
      </div>
      <div className={cls.main}>
        <Tooltip title={item.url}>
          <span className={cls.url}>{item.url}</span>
        </Tooltip>
        <div className={cls.actions}>
          <Space size="small">
            <Button
              icon={<SyncOutlined />}
              type="primary"
              shape="circle"
              size="small"
              title="Rerun request"
            />
            <Button
              danger
              shape="circle"
              size="small"
              title="Remove"
              icon={<DeleteFilled />}
            />
          </Space>
        </div>
      </div>
    </div>
  );
});
SearchItem.displayName = "HistorySearchListItem";
export default SearchItem;
