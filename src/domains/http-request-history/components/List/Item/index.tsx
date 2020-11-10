import React, { memo, useCallback } from "react";
import { ListChildComponentProps } from "react-window";
import { TConnectorProps } from "../../../connectors";
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
import { Color } from "@/utils/color";

type TData = Pick<TConnectorProps, "history" | "removeItem" | "restoreRequest">;
const SearchItem = memo((props: ListChildComponentProps) => {
  const data: TData = props.data;
  const item = data.history[props.index];
  const onRemove = useCallback(() => {
    data.removeItem(item.id);
  }, [item.id, data.removeItem]);
  const onRestore = useCallback(() => {
    data.restoreRequest({
      method: item.method,
      url: item.url,
    });
  }, [data.restoreRequest, item]);
  return (
    <div className={cls.container} style={props.style}>
      <div className={cls.topStats}>
        <Tag style={{ marginRight: "5px" }} color="magenta">
          {item.method}
        </Tag>
        <Tag color={Color.getColorForHttpStatus(item.status)}>
          {item.status}
        </Tag>
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
              onClick={onRestore}
              title="Restore request"
            />
            <Button
              danger
              shape="circle"
              size="small"
              onClick={onRemove}
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
