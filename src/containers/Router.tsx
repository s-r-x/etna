import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/index";
import RootLayout from "@/layouts/Root";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <RootLayout>
        <Route path="/" component={HomePage} />
      </RootLayout>
    </Switch>
  </BrowserRouter>
);

export default Router;
