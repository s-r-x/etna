import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import SocketIOPage from "@/pages/socketio";
import PhoenixPage from "@/pages/phoenix";

const Router = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/socketio" component={SocketIOPage} />
    <Route path="/phoenix" component={PhoenixPage} />
  </Switch>
);

export default Router;
