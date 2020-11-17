import styled from "styled-components";

const pad = "10px";
export const Container = styled.form`
  height: var(--card-utils-approx-height);
  display: flex;
  margin-bottom: var(--card-utils-offset);
  .ant-select {
    margin-right: ${pad};
  }
  .ant-btn {
    margin-left: ${pad};
  }
`;
