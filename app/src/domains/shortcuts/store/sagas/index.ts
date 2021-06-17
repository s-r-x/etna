import { all } from "redux-saga/effects";
import shortcutsEditor from "./shortcuts-editor";
import watchKeyboard from "./watch-keyboard";

export default function* shortcutsSaga() {
  yield all([shortcutsEditor(), watchKeyboard()]);
}
