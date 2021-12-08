import { SagaIterator } from "redux-saga";
import { call, put, select, take } from "typed-redux-saga";
import { INotifySagaDto } from "@ws/shared/typings/dto";
import { PhoenixActions as Actions } from "../slice";
import { PhoenixSelectors as Selectors } from "../selectors";
import { message } from "antd";
import { EWsConnStatus } from "@/domains/ws/shared/typings";

function* connectedSaga(payload: INotifySagaDto): SagaIterator {
  if (payload.room) {
    yield* put(
      Actions.changeChannelConnectStatus({
        topic: payload.room,
        connected: true,
      })
    );
    message.success(`Channel ${payload.room} connected`);
  } else {
    yield* put(Actions.changeConnStatus(EWsConnStatus.CONNECTED));
    message.success("Socket connected");
  }
}
function* disconnectedSaga(payload: INotifySagaDto): SagaIterator {
  if (payload.room) {
    yield* put(
      Actions.changeChannelConnectStatus({
        topic: payload.room,
        connected: false,
      })
    );
    message.error(`Channel ${payload.room} disconnected`);
  } else {
    yield* put(Actions.changeConnStatus(EWsConnStatus.DISCONNECTED));
    message.error("Socket disconnected");
  }
}
export default function* phoenixEventsSaga(): SagaIterator {
  const client = yield* select(Selectors.getClient);
  const chan = yield* call(client.creataSagaChannel);
  while (true) {
    const payload = yield* take(chan);

    yield* put(Actions.log(payload));
    if (payload.ev === "connected") {
      yield* call(connectedSaga, payload);
    } else if (payload.ev === "disconnected") {
      yield* call(disconnectedSaga, payload);
    }
  }
}
