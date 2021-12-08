import FullHeightCard from "@/components/atoms/FullHeightCard";
import React, { useMemo } from "react";
import { List, Space, Typography } from "antd";
import { EWsLogLevel, EWsRouteType, TWsLogItem } from "@ws/shared/typings";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import * as S from "./styled";
import moment from "moment";
import { BaseType } from "antd/lib/typography/Base";

type TProps = {
  logs: TWsLogItem[];
};
const WsLogger = ({ logs: rawLogs }: TProps) => {
  const logs = useMemo(() => {
    return rawLogs.map((log) => ({
      id: log.id,
      room: log.room,
      event: log.ev,
      typography:
        log.lvl === EWsLogLevel.ERR
          ? "danger"
          : log.lvl === EWsLogLevel.OK
          ? "success"
          : undefined,
      message: log.msg,
      date: moment(log.date).format("LTS"),
      route: log.route,
    }));
  }, [rawLogs]);
  const listRef = React.useRef<any>();
  React.useLayoutEffect(() => {
    const $el = listRef.current;
    if (logs.length && $el) {
      $el.scrollTop = $el.scrollHeight;
    }
  }, [logs.length]);
  return (
    <FullHeightCard>
      <S.Container>
        <S.InnerWrap ref={listRef}>
          <List
            size="small"
            rowKey="id"
            dataSource={logs}
            renderItem={(item) => (
              <S.ListItem>
                <Space>
                  <Typography.Text
                    style={{ whiteSpace: "nowrap" }}
                    type="secondary"
                  >
                    {item.date}
                  </Typography.Text>
                  <Typography.Text>
                    {item.route === EWsRouteType.IN ? (
                      <ArrowLeftOutlined />
                    ) : (
                      <ArrowRightOutlined />
                    )}
                  </Typography.Text>
                  {item.room && (
                    <Typography.Text keyboard>{item.room}</Typography.Text>
                  )}
                  {item.event && (
                    <Typography.Text
                      keyboard
                      strong
                      type={item.typography as BaseType}
                    >
                      {item.event}
                    </Typography.Text>
                  )}
                  {item.message && (
                    <Typography.Text code>{item.message}</Typography.Text>
                  )}
                </Space>
              </S.ListItem>
            )}
          />
        </S.InnerWrap>
      </S.Container>
    </FullHeightCard>
  );
};
export default WsLogger;
