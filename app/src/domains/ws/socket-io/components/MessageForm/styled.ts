import styled from "styled-components";
import FullParentHeight from "@/components/FullParentHeight";

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

export const EventInputContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  > button {
    margin-left: 10px;
  }
`;
