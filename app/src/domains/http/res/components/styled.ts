import styled from "styled-components";

const mobileBp = "600px";
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--card-utils-approx-height);
  margin-bottom: var(--card-utils-offset);
  @media (max-width: ${mobileBp}) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    height: auto;
    > :first-child {
      margin-top: 10px;
    }
  }
`;
