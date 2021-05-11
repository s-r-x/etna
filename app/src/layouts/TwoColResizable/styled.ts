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
        // TODO:: light theme
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;
export const RightCol = styled.div`
  width: 100%;
  min-width: 1px;
`;
