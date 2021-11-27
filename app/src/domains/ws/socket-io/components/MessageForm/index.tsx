import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { Input, Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SocketIOSelectors as Selectors } from "@socket-io/store/selectors";
import { SocketIOActions as Actions } from "@socket-io/store/slice";
import { SendOutlined } from "@ant-design/icons";
import * as S from "./styled";

const SocketIoMessageForm = () => {
  const inputMode = useSelector(Selectors.getInputMode);
  const inputData = useSelector(Selectors.getInputData);
  const inputEvent = useSelector(Selectors.getInputEvent);
  const isConnected = useSelector(Selectors.isConnected);
  const dispatch = useDispatch();
  return (
    <>
      <S.EventInputContainer>
        <Input
          value={inputEvent}
          onChange={({ target }) =>
            dispatch(Actions.changeInputEvent(target.value))
          }
          placeholder="event"
        />
        <Button
          icon={<SendOutlined />}
          type="primary"
          disabled={!isConnected}
          onClick={() => dispatch(Actions.sendMessage())}
        >
          Send
        </Button>
      </S.EventInputContainer>
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

export default SocketIoMessageForm;
