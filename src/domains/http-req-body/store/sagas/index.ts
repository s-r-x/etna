import { all } from "redux-saga/effects";
import gqlSaga from "./gql";
import mimeSaga from "./mime";

export default function* () {
  yield all([gqlSaga(), mimeSaga()]);
}
