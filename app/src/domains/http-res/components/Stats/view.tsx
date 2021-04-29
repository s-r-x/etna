import React from "react";
import { Typography, Tooltip, Tag } from "antd";
import * as S from "./styled";
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
    <S.Container>
      <S.Sect>
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
      </S.Sect>
      <S.Sect>
        <Text type="secondary">Time: </Text>
        <Tag>{props.time}</Tag>
      </S.Sect>
      <S.Sect>
        <Text type="secondary">Size: </Text>
        <Tag>{props.size}</Tag>
      </S.Sect>
    </S.Container>
  );
};

export default Stats;
