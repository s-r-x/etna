import React from "react";
import CodeEditor from "@/domains/code-editor/components";
import { Input, Radio, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
import { SendOutlined } from "@ant-design/icons";
import * as S from "./styled";

const SocketIoMessageForm = () => {
  const inputMode = useSelector(Selectors.getInputMode);
  const inputData = useSelector(Selectors.getInputData);
  const inputEvent = useSelector(Selectors.getInputEvent);
  const inputCh = useSelector(Selectors.getInputChannel);
  const channels = useSelector(Selectors.getChannels);
  const isSendMessageEnabled = useSelector(Selectors.isSendMessageEnabled);
  const dispatch = useDispatch();
  return (
    <>
      <S.EventInputContainer>
        <Input
          value={inputEvent}
          onChange={({ target }) =>
            dispatch(Actions.changeInputEvent(target.value))
          }
          placeholder="Event"
        />

        <Select
          aria-required="true"
          onChange={ch => dispatch(Actions.changeInputChannel(ch))}
          placeholder="Channel"
          value={inputCh}
        >
          {channels.map(({ topic }) => (
            <Select.Option key={topic} value={topic}>
              {topic}
            </Select.Option>
          ))}
        </Select>
        <Button
          icon={<SendOutlined />}
          type="primary"
          disabled={!isSendMessageEnabled}
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
            onChange={v => dispatch(Actions.changeInputData(v))}
          />
        </S.InnerWrap>
      </S.Container>
    </>
  );
};

export default SocketIoMessageForm;
