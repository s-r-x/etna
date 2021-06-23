import styled from "styled-components";
import { Card } from "antd";

const FullHeightCard = styled(Card)`
  height: var(--safe-card-height);
  overflow-y: auto;
  .ant-tabs {
    flex: 1;
  }
  @media (max-width: 991px) {
    height: auto;
  }
`;

export default FullHeightCard;
