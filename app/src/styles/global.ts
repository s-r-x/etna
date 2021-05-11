import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --root-layout-offset: 12px;
    --card-pad: 12px;
    --tab-height: 40px;
    --tab-content-offset: 16px;
    --navbar-height: 50px;
    --safe-card-height: calc(100vh - calc(var(--root-layout-offset) * 2) - var(--navbar-height));
    --card-utils-approx-height: 33px;
    --card-utils-offset: 10px;
    --tab-full-height: calc(var(--tab-height) + var(--tab-content-offset));
    --card-editor-offset-top: calc(var(--card-pad) + var(--navbar-height) + var(--card-utils-offset) + var(--tab-full-height));
  }
  .ant-card {
    display: flex;
    flex-direction: column;
    .ant-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  .ant-tabs {
    display: flex;
    flex-direction: column;
  }
  .ant-tabs-content, .ant-tabs-tabpane {
    height: 100%;
  }
  .ant-tabs-tabpane {
    display: flex;
    flex-direction: column;
  }
  .ant-card-body {
    padding: var(--card-pad);
    padding-bottom: 0;
  }
  .ant-card {
    border-color: transparent;
  }
`;
