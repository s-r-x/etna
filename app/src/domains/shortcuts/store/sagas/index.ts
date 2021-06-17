import { all } from "redux-saga/effects";
import shortcutsEditor from "./shortcuts-editor";

export default function* shortcutsSaga() {
  yield all([shortcutsEditor()]);
}
