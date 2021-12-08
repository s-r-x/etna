import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { EWsConnStatus } from "../../typings";
import { put, select } from "typed-redux-saga";
import { TRootState } from "@/store/rootReducer";

type TDto = {
  disconnectAction: ActionCreatorWithoutPayload;
  connectAction: ActionCreatorWithoutPayload;
  interruptAction: ActionCreatorWithoutPayload;
  connStatusSelector: (state: TRootState) => EWsConnStatus;
};
export function createWsUiConnectionSaga(dto: TDto): () => SagaIterator {
  return function* (): SagaIterator {
    const connStatus = yield* select(dto.connStatusSelector);
    if (connStatus === EWsConnStatus.CONNECTED) {
      yield* put(dto.disconnectAction());
    } else if (connStatus === EWsConnStatus.CONNECTING) {
      yield* put(dto.interruptAction());
    } else {
      yield* put(dto.connectAction());
    }
  };
}
