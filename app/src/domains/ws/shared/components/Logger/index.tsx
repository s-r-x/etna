import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import { List, Space, Typography } from "antd";
import { TWsLogUIItem } from "@ws/shared/typings/ui";
import { EWsRouteType } from "@ws/shared/typings";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import * as S from "./styled";

type TProps = {
  logs: TWsLogUIItem[];
};
const WsLogger = ({ logs }: TProps) => {
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
                    <Typography.Text keyboard strong type={item.typography}>
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
