import React from "react";
import { CodeEditorSelectors as Selectors } from "../store/selectors";
import { useSelector } from "react-redux";
import DefaultMapping from "../components/mappings/default";

const VimMapping = React.lazy(() => import("../components/mappings/vim"));
const SublimeMapping = React.lazy(
  () => import("../components/mappings/sublime")
);
const EmacsMapping = React.lazy(() => import("../components/mappings/emacs"));
export const useKeyMapComponent = () => {
  const keyMap = useSelector(Selectors.getKeyMap);
  switch (keyMap) {
    case "vim":
      return VimMapping;
    case "sublime":
      return SublimeMapping;
    case "emacs":
      return EmacsMapping;
    default:
      return DefaultMapping;
  }
};
