import React, { useMemo } from "react";
import cls from "./index.less";
import ms from "pretty-ms";
import pb from "pretty-bytes";
import { Color } from "@/utils/color";
import { HTTP_STATUS_CODES } from "@/misc/http";
import { Typography, Tooltip, Tag } from "antd";
const { Text } = Typography;

type TProps = {
  responseTime: number;
  status: number;
  size: number;
};

const Stats = (props: TProps) => {
  const statusHint = useMemo(() => {
    const meta = HTTP_STATUS_CODES.find(({ value }) => value === props.status);
    if (meta) {
      return meta.hint;
    } else {
      return "Unknown code";
    }
  }, [props.status]);
  return (
    <div className={cls.container}>
      <div className={cls.sect}>
        <Text type="secondary">Status: </Text>
        <Tooltip title={statusHint}>
          <Tag
            color={Color.getColorForHttpStatus(props.status)}
            style={{
              cursor: "help",
            }}
          >
            {props.status}
          </Tag>
        </Tooltip>
      </div>
      <div className={cls.sect}>
        <Text type="secondary">Time: </Text>
        <Tag>{ms(props.responseTime)}</Tag>
      </div>
      <div className={cls.sect}>
        <Text type="secondary">Size: </Text>
        <Tag>{pb(props.size)}</Tag>
      </div>
    </div>
  );
};

export default Stats;
