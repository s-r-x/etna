import styled from "styled-components";
import FullParentHeight from "@/components/FullParentHeight";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const QueryContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
  flex: 1;
`;
export const VarsContainer = styled.div`
  min-height: 1px;
  max-height: 200px;
`;

export const MainEditorWrap = styled(FullParentHeight)`
  @media (max-width: 991px) {
    height: 300px;
    position: static;
  }
`;
