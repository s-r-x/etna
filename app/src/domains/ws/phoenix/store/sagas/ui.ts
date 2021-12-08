import { createWsUiConnectionSaga } from "@/domains/ws/shared/store/sagaCreators/createUiConnectionSaga";
import { SagaIterator } from "redux-saga";
import { takeLatest } from "typed-redux-saga";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions as Actions } from "../slice";

export default function* phoenixUiSaga(): SagaIterator {
  yield* takeLatest(
    Actions.uiConnection.type,
    createWsUiConnectionSaga({
      disconnectAction: Actions.disconnect,
      connectAction: Actions.connect,
      interruptAction: Actions.interrupt,
      connStatusSelector: Selectors.getConnStatus,
    })
  );
}
