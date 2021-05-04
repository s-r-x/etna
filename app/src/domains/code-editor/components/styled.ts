import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
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
  > * {
    margin-right: 5px;
    :last-child {
      margin-right: 0;
    }
  }
  z-index: 10;
`;
