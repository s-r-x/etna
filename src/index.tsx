import React from "react";
import ReactDOM from "react-dom";
import App from "@/containers/App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";

if (module.hot) module.hot.accept();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spin size="large" />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
