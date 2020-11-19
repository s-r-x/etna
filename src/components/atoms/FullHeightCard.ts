import styled from "styled-components";
import { Card } from "antd";

const FullHeightCard = styled(Card)`
  height: 100%;
  .ant-tabs {
    flex: 1;
  }
`;

export default FullHeightCard;
