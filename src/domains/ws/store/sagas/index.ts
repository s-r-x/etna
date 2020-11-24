import { all } from "redux-saga/effects";
import socketIoConnect from "../SocketIO/sagas/connect";
import socketIoEvents from "../SocketIO/sagas/events";
import socketIoMessage from "../SocketIO/sagas/message";


export default function* wsSaga() {
  yield all([socketIoConnect(), socketIoEvents(), socketIoMessage()]);
}
