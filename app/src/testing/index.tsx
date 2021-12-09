// @ts-nocheck
import React from "react";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import { render, RenderOptions } from "@testing-library/react";
import { createStore } from "@/store";
import { Provider } from "react-redux";

const WithProviders: React.FC = props => {
  const store = createStore();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
    </Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  return render(ui, { wrapper: WithProviders, ...options });
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
