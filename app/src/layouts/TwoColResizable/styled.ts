import styled from "styled-components";

export const Root = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  .resize-handler {
    > div {
      z-index: 2;
      ::after {
        content: "";
        position: absolute;
        left: 4px;
        top: 0;
        height: 100%;
        width: 1px;
        background: ${({ theme }) => theme.colors.border.main};
      }
    }
  }
`;
export const RightCol = styled.div`
  width: 100%;
  min-width: 1px;
`;
