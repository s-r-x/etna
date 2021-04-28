import { List } from "antd";
import styled from "styled-components";

export const ListItem = styled(List.Item)`
  .ant-space {
    > .ant-space-item:first-child {
      width: 80px;
    }
  }
`;
