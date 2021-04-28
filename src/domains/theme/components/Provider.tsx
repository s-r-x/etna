import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as Provider } from "styled-components";
import { ThemeSelectors } from "../store/selectors";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: "/dark-theme.css",
  light: "/light-theme.css",
};

const ThemeProvider: React.FC = (props) => {
  const mode = useSelector(ThemeSelectors.getMode);
  return (
    <ThemeSwitcherProvider
      insertionPoint="styles-insertion-point"
      themeMap={themes}
      defaultTheme={mode}
    >
      <Provider theme={mode === "light" ? lightTheme : darkTheme}>
        {props.children}
      </Provider>
    </ThemeSwitcherProvider>
  );
};

export default ThemeProvider;
