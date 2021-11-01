import styled from "styled-components";

const pad = "10px";
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
