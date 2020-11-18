import styled from "styled-components";
import { Card as BaseCard } from "antd";

export const Card = styled(BaseCard)`
  height: 100%;
  .ant-tabs {
    flex: 1;
  }
`;
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--card-utils-approx-height);
  margin-bottom: var(--card-utils-offset);
`;
