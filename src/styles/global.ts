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
    --card-utils-offset: 25px;
    --tab-full-height: calc(var(--tab-height) + var(--tab-content-offset));
    --card-editor-offset-top: calc(var(--card-pad) + var(--navbar-height) + var(--card-utils-offset) + var(--tab-full-height));
  }
`;
