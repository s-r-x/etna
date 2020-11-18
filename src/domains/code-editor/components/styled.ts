import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  .react-codemirror2 {
    height: 100%;
  }
  .CodeMirror {
    height: 100%;
  }
`;
export const Extra = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 10;
`;
