import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/Root";

import HomePage from "@/pages/home";
import SocketIOPage from "@/pages/socketio";
import PhoenixPage from "@/pages/phoenix";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <RootLayout>
        <Route path="/" exact component={HomePage} />
        <Route path="/socketio" component={SocketIOPage} />
        <Route path="/phoenix" component={PhoenixPage} />
      </RootLayout>
    </Switch>
  </BrowserRouter>
);

export default Router;
