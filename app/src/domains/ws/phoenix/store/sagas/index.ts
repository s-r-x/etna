import { spawn } from "redux-saga/effects";
import connect from "./connect";
import events from "./events";
import channels from "./channels";
import message from "./message";
import ui from "./ui";

export default function* phoenixSaga() {
  yield spawn(connect);
  yield spawn(events);
  yield spawn(channels);
  yield spawn(message);
  yield spawn(ui);
}
