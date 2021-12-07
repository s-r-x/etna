import { spawn } from "redux-saga/effects";
import gqlSaga from "./gql";
import mimeSaga from "./mime";

export default function* () {
  spawn(gqlSaga);
  spawn(mimeSaga);
}
