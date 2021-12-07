import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import SocketIOPage from "@/pages/socketio";
import PhoenixPage from "@/pages/phoenix";
import WsPage from "@/pages/ws";

const Router = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/socketio" component={SocketIOPage} />
    <Route path="/phoenix" component={PhoenixPage} />
    <Route path="/ws" component={WsPage} />
  </Switch>
);

export default Router;
