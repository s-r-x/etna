import React from "react";
import ReactDOM from "react-dom";
import App from "@/containers/App";
import { PROD } from "./constants/env";

if (module.hot) module.hot.accept();
if (PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

ReactDOM.render(<App />, document.getElementById("root"));
