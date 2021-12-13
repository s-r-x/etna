import { HttpRequestSelectors as ReqSelectors } from "@/domains/http/req/root/store/selectors";
import { HttpResponseSelectors as ResSelectors } from "@/domains/http/res/store/selectors";
import { SagaIterator } from "redux-saga";
import { select, takeEvery, put } from "typed-redux-saga";
import { HttpHistoryActions as Actions } from "../slice";
import { UUID } from "@/utils/uuid";
import _ from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";
import { THistoryItem } from "@/domains/http/history/typings/store";
import { HttpReqActions } from "@/domains/http/req/root/store/slice";
import { HttpResActions } from "@/domains/http/res/store/slice";
import { HttpReqBodyActions as BodyActions } from "@/domains/http/req/body/store/slice";
import { HttpReqBodySelectors as BodySelectors } from "@/domains/http/req/body/store/selectors";

function* extractSaga(): SagaIterator {
  const req = yield* select(ReqSelectors.getRequest);
  const res = yield* select(ResSelectors.getResponse);
  const body = yield* select(BodySelectors.getFullBody);
  yield* put(
    Actions.addItem({
      id: UUID.gen(),
      req: {
        ..._.pick(req, ["headers", "url", "method", "query", "auth"]),
        date: new Date().getTime(),
      },
      res: res.isBinary ? _.omit(res, "data") : res,
      body: {
        ..._.pick(body, ["mime", "text", "kv"]),
        gql: {
          vars: body.gql.vars,
        },
      },
    })
  );
}
function* restoreSaga({ payload }: PayloadAction<THistoryItem>): SagaIterator {
  yield* put(HttpResActions.restoreFromHistory(payload.res));
  yield* put(HttpReqActions.restoreFromHistory(payload.req));
  yield* put(BodyActions.restoreFromHistory(payload.body));
}

export default function* () {
  yield* takeEvery(Actions.extractItem.type, extractSaga);
  yield* takeEvery(Actions.restoreItem.type, restoreSaga);
}
