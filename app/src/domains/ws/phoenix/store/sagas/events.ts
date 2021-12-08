import { SagaIterator } from "redux-saga";
import { call, put, select, take } from "typed-redux-saga";
import { INotifySagaDto } from "@ws/shared/typings/dto";
import { PhoenixActions as Actions } from "../slice";
import { PhoenixSelectors as Selectors } from "../selectors";
import { EWsConnStatus } from "@/domains/ws/shared/typings";

function* connectedSaga(payload: INotifySagaDto): SagaIterator {
  if (payload.room) {
    yield* put(
      Actions.changeChannelConnectStatus({
        topic: payload.room,
        connected: true,
      })
    );
  } else {
    yield* put(Actions.changeConnStatus(EWsConnStatus.CONNECTED));
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
  } else {
    yield* put(Actions.changeConnStatus(EWsConnStatus.DISCONNECTED));
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
