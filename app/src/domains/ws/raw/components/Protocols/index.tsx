import React from "react";
import * as S from "./styled";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { WsRawSelectors as Selectors } from "../../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { WsRawActions as Actions } from "../../store/slice";
import { TRootState } from "@/store/rootReducer";

const connector = connect(
  (state: TRootState) => ({
    protocols: Selectors.getProtocols(state),
  }),
  {
    addEmptyProtocol: Actions.addProtocol,
    changeProtocol: Actions.changeProtocol,
    removeProtocol: Actions.removeProtocol,
  }
);
const WsRawProtocols = (props: ConnectedProps<typeof connector>) => {
  return (
    <S.Container>
      <Button
        title="Add protocol"
        type="primary"
        block
        onClick={props.addEmptyProtocol}
        icon={<PlusOutlined />}
      ></Button>
      {props.protocols.map((protocol, idx) => (
        <S.Protocol key={idx}>
          <S.ProtocolActions>
            <Button
              onClick={() => props.removeProtocol(idx)}
              type="primary"
              danger
              title="Remove"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </S.ProtocolActions>
          <Input
            placeholder="Protocol"
            value={protocol}
            onChange={({ target }) =>
              props.changeProtocol({ id: idx, value: target.value })
            }
          />
        </S.Protocol>
      ))}
    </S.Container>
  );
};
export default connector(WsRawProtocols);
