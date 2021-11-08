import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeSelectors } from "../store/selectors";
import { ThemeActions } from "../store/slice";
import MoonIcon from "@/components/icons/Moon";
import SunIcon from "@/components/icons/Sun";
import styled from "styled-components";

const StyledMoonIcon = styled(MoonIcon)`
  color: #436185;
  font-size: 20px;
`;
const StyledSunIcon = styled(SunIcon)`
  color: #feb356;
  font-size: 22px;
`;

const ThemeToggler = () => {
  const mode = useSelector(ThemeSelectors.getMode);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(ThemeActions.toggleMode())}>
      {mode === "dark" ? <StyledMoonIcon /> : <StyledSunIcon />}
    </button>
  );
};

export default ThemeToggler;
