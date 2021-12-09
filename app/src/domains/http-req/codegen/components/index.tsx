import React from "react";
import Renderer from "./Renderer";
import Picker from "./Picker";
import { useSelector } from "react-redux";
import { HttpCodegenSelectors } from "../store/selectors";

const HttpCodegenComponent = () => {
  const snippet = useSelector(HttpCodegenSelectors.getSnippet);
  return (
    <div>
      <Picker snippet={snippet} />
      <Renderer snippet={snippet} />
    </div>
  );
};
export default HttpCodegenComponent;
