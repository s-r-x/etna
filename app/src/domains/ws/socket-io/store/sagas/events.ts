import { SagaIterator } from "redux-saga";
import { call, put, select, take } from "typed-redux-saga";
import { INotifySagaDto } from "@ws/shared/typings/dto";
import { SocketIOActions as Actions } from "@socket-io/store/slice";
import { SocketIOSelectors } from "@socket-io/store/selectors";
import { message } from "antd";

function* connectedSaga(): SagaIterator {
  yield* put(Actions.changeConnectStatus(true));
  message.success("Connected");
}
function* disconnectedSaga(): SagaIterator {
  yield* put(Actions.changeConnectStatus(false));
  message.error("Disconnected");
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
