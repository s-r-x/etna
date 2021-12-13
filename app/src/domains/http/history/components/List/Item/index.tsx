import React, { memo, useCallback } from "react";
import { ListChildComponentProps } from "react-window";
import { TConnectorProps } from "../../../connectors";
import { Tag, Tooltip, Button, Space } from "antd";
import ms from "pretty-ms";
import {
  ClockCircleFilled,
  CalendarFilled,
  SyncOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import * as S from "./styled";
import day from "dayjs";
import { getColorForHttpStatus } from "@/domains/http/shared/utils/get-color-for-http-status";

type TData = Pick<TConnectorProps, "history" | "removeItem" | "restore">;
const SearchItem = memo((props: ListChildComponentProps) => {
  const data: TData = props.data;
  const item = data.history[props.index];
  const onRemove = useCallback(() => {
    data.removeItem(item.id);
  }, [item.id, data.removeItem]);
  const onRestore = useCallback(() => {
    data.restore(item);
  }, [data.restore, item]);
  return (
    <S.Container style={props.style}>
      <S.TopStats>
        <Tag style={{ marginRight: "5px" }} color="magenta">
          {item.req.method}
        </Tag>
        <Tag color={getColorForHttpStatus(item.res.status)}>
          {item.res.status}
        </Tag>
        <S.TimeSect>
          <S.ResponseTime>
            <ClockCircleFilled />
            <span style={{ marginLeft: "5px" }}>
              {ms(item.res.responseTime)}
            </span>
          </S.ResponseTime>
          <S.RequestDate>
            <CalendarFilled />
            <span style={{ marginLeft: "5px" }}>
              {day(item.req.date).format("L LT")}
            </span>
          </S.RequestDate>
        </S.TimeSect>
      </S.TopStats>
      <S.UrlAndActions>
        <Tooltip title={item.req.url}>
          <S.RequestUrl>{item.req.url}</S.RequestUrl>
        </Tooltip>
        <S.Actions>
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
        </S.Actions>
      </S.UrlAndActions>
    </S.Container>
  );
});
SearchItem.displayName = "HistorySearchListItem";
export default SearchItem;
