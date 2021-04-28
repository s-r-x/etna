import React, { memo, useCallback } from "react";
import { ListChildComponentProps } from "react-window";
import { TConnectorProps } from "../../../connectors";
import { Tag, Tooltip, Button, Space } from "antd";
import moment from "moment";
import ms from "pretty-ms";
import {
  ClockCircleFilled,
  CalendarFilled,
  SyncOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Color } from "@/utils/color";
import * as S from "./styled";

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
        <Tag color={Color.getColorForHttpStatus(item.res.status)}>
          {item.res.status}
        </Tag>
        <S.ResponseTime>
          <ClockCircleFilled />
          <span style={{ marginLeft: "5px" }}>{ms(item.res.responseTime)}</span>
        </S.ResponseTime>
        <S.RequestDate>
          <CalendarFilled />
          <span style={{ marginLeft: "5px" }}>
            {moment(item.req.date).format("MM-DD-YYYY HH:mm")}
          </span>
        </S.RequestDate>
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
