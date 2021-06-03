import styled from "styled-components";
import { NavLink as BaseLink } from "react-router-dom";
import { Layout } from "antd";

export const Logo = styled.div`
  text-align: center;
  * {
    margin: 0 !important;
  }
`;

export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  height: var(--navbar-height);
  line-height: var(--navbar-height);
`;
export const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 30px;
  li {
    position: relative;
    width: var(--navbar-height);
    height: var(--navbar-height);
  }
`;

export const Link = styled(BaseLink)`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  transition: background-color 0.25s ease;
  font-size: 16px;
  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.secondary.accent};
    color: white;
  }
  &.link-active {
    background-color: ${({ theme }) => theme.colors.secondary.main};
    color: white;
  }
`;
export const Content = styled(Layout.Content)`
  display: flex;
  margin: var(--root-layout-offset);
`
