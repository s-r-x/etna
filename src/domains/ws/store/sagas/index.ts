import { all } from "redux-saga/effects";
import socketIoConnect from "../SocketIO/sagas/connect";
import socketIoEvents from "../SocketIO/sagas/events";
import socketIoMessage from "../SocketIO/sagas/message";
import phoenixConnect from "../Phoenix/sagas/connect";
import phoenixEvents from "../Phoenix/sagas/events";

export default function* wsSaga() {
  yield all([
    socketIoConnect(),
    socketIoEvents(),
    socketIoMessage(),
    phoenixConnect(),
    phoenixEvents(),
  ]);
}
