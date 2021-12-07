import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { WsRawSelectors as Selectors } from "@ws/raw/store/selectors";
import { WsRawActions as Actions } from "@ws/raw/store/slice";
import { SendOutlined } from "@ant-design/icons";
import * as S from "./styled";

const WsRawMessageForm = () => {
  const inputMode = useSelector(Selectors.getInputMode);
  const inputData = useSelector(Selectors.getInputData);
  const isConnected = useSelector(Selectors.isConnected);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        icon={<SendOutlined />}
        type="primary"
        block
        disabled={!isConnected}
        onClick={() => dispatch(Actions.sendMessage())}
      >
        Send
      </Button>
      <S.Container>
        <S.InnerWrap>
          <CodeEditor
            extra={
              <Radio.Group
                onChange={({ target }) =>
                  dispatch(Actions.changeInputMode(target.value))
                }
                size="small"
                value={inputMode}
              >
                <Radio.Button value="application/json">JSON</Radio.Button>
                <Radio.Button value="text/plain">Text</Radio.Button>
              </Radio.Group>
            }
            mode={inputMode}
            value={inputData}
            onChange={(v) => dispatch(Actions.changeInputData(v))}
          />
        </S.InnerWrap>
      </S.Container>
    </>
  );
};

export default WsRawMessageForm;
