import { all } from "redux-saga/effects";
import connect from "./connect";
import events from "./events";
import message from "./message";
import ui from "./ui";

export default function* socketIoSaga() {
  yield all([connect(), events(), message(), ui()]);
}
