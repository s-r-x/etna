import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { HttpResponseSelectors as Selectors } from "../../store/selectors";
import { useHttpStatusHint } from "@/hooks/useHttpStatusHint";
import { Typography, Tooltip, Tag } from "antd";
import * as S from "./styled";
import { useHttpStatusColor } from "@/hooks/useHttpStatusColor";
const { Text } = Typography;

const connector = connect((state) => ({
  time: Selectors.getFormattedResponseTime(state),
  size: Selectors.getFormattedResponseSize(state),
  status: Selectors.getResponseStatus(state),
}));
type TProps = ConnectedProps<typeof connector>;
const Stats = (props: TProps) => {
  const statusHint = useHttpStatusHint(props.status);
  const color = useHttpStatusColor(props.status);
  return (
    <S.Container>
      <S.Sect>
        {props.status && (
          <>
            <Text type="secondary">Status: </Text>
            <Tooltip title={statusHint}>
              <Tag
                color={color}
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

export default connector(Stats);
