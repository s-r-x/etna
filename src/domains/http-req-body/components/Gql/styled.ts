import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: calc(var(--safe-card-height) - var(--card-editor-offset-top));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const QueryContainer = styled.div`
  min-height: 300px;
  margin-bottom: 15px;
  flex: 1;
`;
export const VarsContainer = styled.div`
  min-height: 1px;
`;
