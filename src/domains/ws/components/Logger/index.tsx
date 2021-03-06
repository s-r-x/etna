import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import { List, Space, Typography } from "antd";
import FullParentHeight from "@/components/FullParentHeight";
import { TWsLogUIItem } from "../../typings/ui";
import { EWsRouteType } from "../../typings/store";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import * as S from "./styled";

type TProps = {
  logs: TWsLogUIItem[];
};
const WsLogger = ({ logs }: TProps) => {
  const ref = React.useRef<HTMLDivElement>();
  React.useLayoutEffect(() => {
    ref.current.scrollIntoView();
  }, [logs.length]);
  return (
    <FullHeightCard>
      <div style={{ flex: 1, position: "relative" }}>
        <FullParentHeight>
          <List
            size="small"
            rowKey="id"
            dataSource={logs}
            renderItem={(item) => (
              <S.ListItem>
                <Space>
                  <Typography.Text type="secondary">
                    {item.date}
                  </Typography.Text>
                  <Typography.Text>
                    {item.route === EWsRouteType.IN ? (
                      <ArrowLeftOutlined />
                    ) : (
                      <ArrowRightOutlined />
                    )}
                  </Typography.Text>
                  <Typography.Text keyboard type={item.typography}>
                    {item.event}
                  </Typography.Text>
                  {item.message && (
                    <Typography.Text code>{item.message}</Typography.Text>
                  )}
                </Space>
              </S.ListItem>
            )}
          />
          <div ref={ref} />
        </FullParentHeight>
      </div>
    </FullHeightCard>
  );
};
export default WsLogger;
