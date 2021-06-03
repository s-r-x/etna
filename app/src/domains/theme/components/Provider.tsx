import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as Provider } from "styled-components";
import { ThemeSelectors } from "../store/selectors";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import {
  ThemeSwitcherProvider,
  useThemeSwitcher,
} from "react-css-theme-switcher";
import FullScreenSpin from "@/components/SullScreenSpin";

const themes = {
  dark: "/dark-theme.css",
  light: "/light-theme.css",
};

const Main: React.FC = ({ children }) => {
  const { status } = useThemeSwitcher();
  return status === "loaded" ? (
    (children as React.ReactElement)
  ) : (
    <FullScreenSpin />
  );
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
        <Main>{props.children}</Main>
      </Provider>
    </ThemeSwitcherProvider>
  );
};

export default ThemeProvider;
