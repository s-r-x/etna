import styled from "styled-components";

const mobileBp = "600px";
const pad = "10px";

export const Container = styled.form`
  height: var(--card-utils-approx-height);
  display: flex;
  margin-bottom: var(--card-utils-offset);
  @media (max-width: ${mobileBp}) {
    flex-direction: column;
    height: auto;
  }
`;
export const ButtonsRoot = styled.div`
  display: flex;
  .ant-btn {
    margin-left: ${pad};
  }
  @media (max-width: ${mobileBp}) {
    margin-top: ${pad};
    .ant-btn {
      margin-left: 0;
      margin-right: ${pad};
    }
  }
`;
export const InputsRoot = styled.div`
  display: flex;
  flex: 1;
  .ant-select {
    margin-right: ${pad};
  }
`;
