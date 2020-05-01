import React from "react";
import cls from "./index.less";
import { Typography, Tooltip, Tag } from "antd";
const { Text } = Typography;

type TProps = {
  size?: string;
  time: string;
  status?: number;
  statusColor?: string;
  statusHint?: string;
};

const Stats = (props: TProps) => {
  return (
    <div className={cls.container}>
      <div className={cls.sect}>
        {props.status && (
          <>
            <Text type="secondary">Status: </Text>
            <Tooltip title={props.statusHint}>
              <Tag
                color={props.statusColor}
                style={{
                  cursor: "help",
                }}
              >
                {props.status}
              </Tag>
            </Tooltip>
          </>
        )}
      </div>
      <div className={cls.sect}>
        <Text type="secondary">Time: </Text>
        <Tag>{props.time}</Tag>
      </div>
      <div className={cls.sect}>
        <Text type="secondary">Size: </Text>
        <Tag>{props.size}</Tag>
      </div>
    </div>
  );
};

export default Stats;
