import styled from "styled-components";
import { Card } from "antd";

const FullHeightCard = styled(Card)`
  height: var(--safe-card-height);
  overflow-y: auto;
  .ant-card-head {
    display: none;
  }
  .ant-tabs {
    flex: 1;
  }
  @media (max-width: 991px) {
    height: auto;
    .ant-card-head {
      display: block;
    }
  }
`;

export default FullHeightCard;
