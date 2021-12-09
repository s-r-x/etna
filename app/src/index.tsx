import React from "react";
import ReactDOM from "react-dom";
import App from "@/containers/App";
import { PROD } from "./constants/env";
import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
day.extend(localizedFormat);

if (module.hot) module.hot.accept();
if (PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

ReactDOM.render(<App />, document.getElementById("root"));
