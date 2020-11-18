import React from "react";
import "@/styles/vendor.css";
import Router from "@/containers/Router";
import { GlobalStyle } from "@/styles/global";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";
import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import ThemeProvider from "@/domains/theme/components/Provider";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Spin size="large" />} persistor={persistor}>
      <ThemeProvider>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
