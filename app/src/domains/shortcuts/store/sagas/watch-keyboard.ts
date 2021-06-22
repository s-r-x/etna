import { SagaIterator, eventChannel } from "redux-saga";
import {
  select,
  call,
  take,
  fork,
  cancel,
  cancelled,
  delay,
  put,
} from "typed-redux-saga";
import { openEditor, closeEditor } from "../slice";
import hotkeys, { HotkeysEvent } from "hotkeys-js";
import { ShortcutsSelectors } from "../selectors";
import { EShortcutEv } from "../../typings/actions";
import { HttpReqActions } from "@/domains/http-req/root/store/slice";
import { WebApi } from "@/utils/webapi";
import { message } from "antd";
import { HttpRequestSelectors } from "@/domains/http-req/root/store/selectors";

function createKeyboardChannel(keys: string) {
  return eventChannel<string>((emit) => {
    const onPress = (rawEvent: KeyboardEvent, e: HotkeysEvent) => {
      rawEvent.preventDefault();
      emit(e.key);
    };
    hotkeys(keys, onPress);
    return () => hotkeys.unbind(keys, onPress);
  });
}

function focusUrl() {
  const $input = document.getElementById("http-req-url-input");
  if ($input) {
    $input.focus();
  }
}
function* copyUrl() {
  const url = yield* select(HttpRequestSelectors.getUrl);
  if (url) {
    yield* call(WebApi.copyToClipboard, url);
    yield* call(message.info, "URL copied to the clipboard");
  }
}
function* watchKeyboardSaga(): SagaIterator {
  const keys = yield* select(ShortcutsSelectors.getKeysForKeyboardWatcher);
  const chan = yield* call(createKeyboardChannel, keys);
  try {
    while (true) {
      const shortcut = yield* take(chan);
      const keyToEvent = yield* select(ShortcutsSelectors.getKeysMap);
      if (shortcut in keyToEvent) {
        switch (keyToEvent[shortcut]) {
          case EShortcutEv.MAKE_OR_CANCEL_REQUEST:
            yield* put(HttpReqActions.makeOrCancelRequest());
            break;
          case EShortcutEv.SELECT_GET_METHOD:
            yield* put(HttpReqActions.changeMethod("GET"));
            break;
          case EShortcutEv.SELECT_POST_METHOD:
            yield* put(HttpReqActions.changeMethod("POST"));
            break;
          case EShortcutEv.SELECT_PUT_METHOD:
            yield* put(HttpReqActions.changeMethod("PUT"));
            break;
          case EShortcutEv.SELECT_PATCH_METHOD:
            yield* put(HttpReqActions.changeMethod("PATCH"));
            break;
          case EShortcutEv.SELECT_DELETE_METHOD:
            yield* put(HttpReqActions.changeMethod("DELETE"));
            break;
          case EShortcutEv.FOCUS_URL:
            yield* call(focusUrl);
            break;
          case EShortcutEv.COPY_URL:
            yield* call(copyUrl);
            break;
          default:
            console.log(`Unknown shortcut. Key: ${shortcut}`);
        }
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (yield* cancelled()) {
      chan.close();
    }
  }
}
export default function* main() {
  while (true) {
    const task = yield* fork(watchKeyboardSaga);
    yield* take(openEditor.type);
    yield* cancel(task);
    yield* take(closeEditor.type);
    // wait a little bit for redux to update shortcuts, if there was some updates
    yield* delay(25);
  }
}
