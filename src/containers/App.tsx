import React from "react";
import "@/styles/vendor.css";
import Router from "@/containers/Router";
import { GlobalStyle } from "@/styles/global";

const App = () => (
  <>
    <GlobalStyle />
    <Router />
  </>
);

export default App;
