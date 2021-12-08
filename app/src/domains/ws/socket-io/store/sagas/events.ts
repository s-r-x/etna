import { SagaIterator } from "redux-saga";
import { call, put, select, take } from "typed-redux-saga";
import { INotifySagaDto } from "@ws/shared/typings/dto";
import { SocketIOActions as Actions } from "@socket-io/store/slice";
import { SocketIOSelectors } from "@socket-io/store/selectors";
import { EWsConnStatus } from "@/domains/ws/shared/typings";

function* connectedSaga(): SagaIterator {
  yield* put(Actions.changeConnStatus(EWsConnStatus.CONNECTED));
}
function* disconnectedSaga(): SagaIterator {
  yield* put(Actions.changeConnStatus(EWsConnStatus.DISCONNECTED));
}
export default function* socketIoEventsSaga(): SagaIterator {
  const client = yield* select(SocketIOSelectors.getClient);
  const chan = yield* call(client.creataSagaChannel);
  while (true) {
    const payload: INotifySagaDto = yield* take(chan);

    yield* put(Actions.log(payload));

    if (payload.ev === "connected") {
      yield* call(connectedSaga);
    } else if (payload.ev === "disconnected") {
      yield* call(disconnectedSaga);
    }
  }
}
