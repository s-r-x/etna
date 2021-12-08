import styled from "styled-components";
import { Form as BaseForm } from "antd";

export const Container = styled.div`
  display: flex;
  > button {
    margin-left: 10px;
  }
`;
export const Form = styled(BaseForm)`
  flex: 1;
`;
