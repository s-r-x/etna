import React from "react";
import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ThemeSelectors } from "../store/selectors";
import { ThemeActions } from "../store/slice";
import MoonIcon from "@/components/icons/Moon";
import SunIcon from "@/components/icons/Sun";
import styled from "styled-components";

const StyledSwitch = styled(Switch)`
  && {
    background-color: ${({ checked }) => (checked ? "#436185" : "#84AEFF")};
  }
`;

const ThemeToggler = () => {
  const mode = useSelector(ThemeSelectors.getMode);
  const dispatch = useDispatch();
  return (
    <StyledSwitch
      checked={mode === "dark"}
      onChange={(v) => dispatch(ThemeActions.changeMode(v ? "dark" : "light"))}
      checkedChildren={<MoonIcon style={{ color: "#fff" }} />}
      unCheckedChildren={
        <SunIcon
          style={{ fontSize: "16px", paddingTop: "3px", color: "#FEB356" }}
        />
      }
    />
  );
};

export default ThemeToggler;
