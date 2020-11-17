import styled from "styled-components";
import { Card as BaseCard } from "antd";

export const Card = styled(BaseCard)`
  height: 100%;
  max-height: calc(100vh - 200px);
`;
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Content = styled.div`
  margin-top: 15px;
`;
