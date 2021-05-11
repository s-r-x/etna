import styled from "styled-components";
import { Card } from "antd";

const FullHeightCard = styled(Card)`
  height: var(--safe-card-height);
  overflow-y: auto;
  .ant-tabs {
    flex: 1;
  }
`;

export default FullHeightCard;
