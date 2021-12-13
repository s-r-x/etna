import { put, select, debounce } from "typed-redux-saga";
import { HttpReqBodyActions as Actions } from "../slice";
import { SagaIterator } from "redux-saga";
import { HttpReqBodySelectors as Selectors } from "../selectors";
import { HttpRequestSelectors } from "@/domains/http/req/root/store/selectors";
import { HttpReqActions } from "@/domains/http/req/root/store/slice";
import { THTTPBodyMIME } from "@/domains/http/shared/typings";

function* bodyMimeSaga(): SagaIterator {
  const mime = yield* select(Selectors.getMIME);
  const headers = yield* select(HttpRequestSelectors.getHeaders);
  const newMime: THTTPBodyMIME =
    mime === "application/graphql" ? "application/json" : mime;
  const contentHeaderIdx = headers.findIndex(
    ({ key }) => key === "Content-Type"
  );
  if (contentHeaderIdx !== -1) {
    yield* put(
      HttpReqActions.changeHeaderValue({ id: contentHeaderIdx, value: newMime })
    );
  } else {
    yield* put(
      HttpReqActions.addHeader({
        key: "Content-Type",
        value: newMime,
        active: true,
      })
    );
  }
}
export default function* watchBodyMime() {
  yield* debounce(200, Actions.changeMIME.type, bodyMimeSaga);
}
