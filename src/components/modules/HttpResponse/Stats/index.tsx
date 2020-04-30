import React, { useMemo } from "react";
import cls from "./index.less";
import ms from "pretty-ms";
import pb from "pretty-bytes";
import { Color } from "@/utils/color";
import { HTTP_STATUS_CODES } from "@/misc/http";
import { Typography, Tooltip, Tag } from "antd";
import { TProviderProps } from "../provider";
const { Text } = Typography;

type TProps = Pick<TProviderProps, "response" | "responseSize">;

const Stats = ({ response, responseSize }: TProps) => {
  const statusHint = useMemo(() => {
    const meta = HTTP_STATUS_CODES.find(
      ({ value }) => value === response.status
    );
    if (meta) {
      return meta.hint;
    } else {
      return "Unknown code";
    }
  }, [response.status]);
  return (
    <div className={cls.container}>
      <div className={cls.sect}>
        <Text type="secondary">Status: </Text>
        <Tooltip title={statusHint}>
          <Tag
            color={Color.getColorForHttpStatus(response.status)}
            style={{
              cursor: "help",
            }}
          >
            {response.status}
          </Tag>
        </Tooltip>
      </div>
      <div className={cls.sect}>
        <Text type="secondary">Time: </Text>
        <Tag>{ms(response.responseTime)}</Tag>
      </div>
      {response.data && (
        <div className={cls.sect}>
          <Text type="secondary">Size: </Text>
          <Tag>{pb(responseSize)}</Tag>
        </div>
      )}
    </div>
  );
};

export default Stats;
