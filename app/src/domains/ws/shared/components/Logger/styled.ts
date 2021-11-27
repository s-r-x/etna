import { List } from "antd";
import FullParentHeight from "@/components/FullParentHeight";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  position: relative;
`;
export const InnerWrap = styled(FullParentHeight)`
  @media (max-width: 991px) {
    height: 300px;
    position: static;
  }
`;
export const ListItem = styled(List.Item)`
  .ant-space {
    > .ant-space-item:first-child {
      width: 80px;
    }
  }
`;
