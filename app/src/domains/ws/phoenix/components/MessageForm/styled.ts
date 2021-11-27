import styled from "styled-components";
import FullParentHeight from "@/components/FullParentHeight";

const pad = "10px";

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
  .ant-select {
    width: 150px;
    margin-left: ${pad};
  }
  > button {
    margin-left: ${pad};
  }
`;
