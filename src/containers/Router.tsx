import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/Root";

import HomePage from "@/pages/home";
import SettingsPage from "@/pages/settings";
import SocketIOPage from "@/pages/socketio";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <RootLayout>
        <Route path="/" exact component={HomePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/socketio" component={SocketIOPage} />
      </RootLayout>
    </Switch>
  </BrowserRouter>
);

export default Router;
