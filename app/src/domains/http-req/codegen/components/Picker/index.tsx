import React from "react";
import { OPTIONS_SELECT } from "../../constants";
import { Cascader, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { HttpCodegenSelectors as Selectors } from "../../store/selectors";
import { HttpCodegenActions as Actions } from "../../store/slice";
import * as S from "./styled";
import { WebApi } from "@/utils/webapi";

type TProps = {
  snippet: string;
};
const CodegenPicker = ({ snippet }: TProps) => {
  const dispatch = useDispatch();
  const value = useSelector(Selectors.getSelectValue);
  const onCopy = () => {
    WebApi.copyToClipboard(snippet);
  };
  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <Cascader
          allowClear={false}
          onChange={(value) =>
            dispatch(Actions.changeTargetAndClient(value as any))
          }
          size="large"
          value={value}
          options={OPTIONS_SELECT}
          placeholder="Target"
        />
        <Button size="large" onClick={onCopy}>
          Copy
        </Button>
      </S.Container>
    </>
  );
};
export default CodegenPicker;
