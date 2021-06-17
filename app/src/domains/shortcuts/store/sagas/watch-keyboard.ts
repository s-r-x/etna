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
    yield* delay(50);
  }
}
