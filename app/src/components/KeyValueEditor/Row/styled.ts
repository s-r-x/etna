import styled from "styled-components";
import { Space } from "antd";

export const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
export const Utils = styled.div`
  display: block;
  margin-right: 10px;
`;

export const Inputs = styled(Space)`
  display: flex;
  flex: 1;
  > div:nth-child(-n + 2) {
    flex-grow: 1;
  }
`;
