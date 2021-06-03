import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
    outline: none;
    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  }

  :root {
    --root-layout-offset: 0px;
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
  }
  .ant-card {
    border-color: transparent;
  }
`;
