import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --root-layout-offset: 12px;
    --card-pad: 24px;
    --tab-height: 40px;
    --tab-content-offset: 16px;
    --navbar-height: 64px;
    --safe-card-height: calc(100vh - (var(--root-layout-offset) * 2) - var(--navbar-height));
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
    color: ${({ theme }) => theme.colors.font.accent};
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active,
  .ant-dropdown-menu-item-selected {
    color: ${({ theme }) => theme.colors.secondary.main};
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: ${({ theme }) => theme.colors.primary.main};
  }
  .ant-tabs-content, .ant-tabs-tabpane {
    height: 100%;
  }
  .ant-tabs-tabpane {
    display: flex;
    flex-direction: column;
  }
  .ant-btn {
    background-color: ${({ theme }) => theme.colors.elevate};
    color: ${({ theme }) => theme.colors.font.accent};
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: ${({ theme }) => theme.colors.primary.main};
  }
  .ant-tabs-bar {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.main};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  .ant-card {
    background-color: ${({ theme }) => theme.colors.paper};
    border-color: transparent;
    color: ${({ theme }) => theme.colors.font.main};
  }
  .ant-select {
    color: ${({ theme }) => theme.colors.font.accent};
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background-color: ${({ theme }) => theme.colors.elevate};
    border-color: ${({ theme }) => theme.colors.border.main};
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    background-color: ${({ theme }) => theme.colors.elevate};
  }
  .ant-input-clear-icon {
    color: ${({ theme }) => theme.colors.font.accent};
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    border: 1px solid ${({ theme }) => theme.colors.border.main};
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    :hover {
      border-color: ${({ theme }) => theme.colors.primary.accent};
    }
  }
  .ant-input-affix-wrapper {
    border: 1px solid ${({ theme }) => theme.colors.border.main};
    :hover {
      border-color: ${({ theme }) => theme.colors.primary.accent};
    }
  }
  .ant-input, .ant-input-affix-wrapper {
    background-color: ${({ theme }) => theme.colors.elevate};
    color: ${({ theme }) => theme.colors.font.main};
  }
  .ant-layout {
    background: ${({ theme }) => theme.colors.layout};
  }
  .ant-switch-checked {
    background-color: ${({ theme }) => theme.colors.primary.main};

  }
  .ant-btn-primary {
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    :focus, :hover {
      background-color: ${({ theme }) => theme.colors.primary.accent};
      border-color: ${({ theme }) => theme.colors.primary.accent};
    }
  }
`;
