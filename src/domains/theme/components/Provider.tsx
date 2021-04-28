import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as Provider } from "styled-components";
import { ThemeSelectors } from "../store/selectors";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";

const ThemeProvider: React.FC = (props) => {
  const mode = useSelector(ThemeSelectors.getMode);
  return (
    <Provider theme={mode === "light" ? lightTheme : darkTheme}>
      {props.children}
    </Provider>
  );
};

export default ThemeProvider;
