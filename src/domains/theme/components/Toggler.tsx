import React from "react";
import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ThemeSelectors } from "../store/selectors";
import { ThemeActions } from "../store/slice";

const ThemeToggler = () => {
  const mode = useSelector(ThemeSelectors.getMode);
  const dispatch = useDispatch();
  return (
    <Switch
      checked={mode === "dark"}
      onChange={(v) => dispatch(ThemeActions.changeMode(v ? "dark" : "light"))}
    />
  );
};

export default ThemeToggler;
