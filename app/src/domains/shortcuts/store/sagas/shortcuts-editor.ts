import { SagaIterator, eventChannel, END } from "redux-saga";
import { call, take, fork, cancel, cancelled, put } from "typed-redux-saga";
import { openEditor, closeEditor, setEditorPressedCombo } from "../slice";
import _ from "lodash";
import { normalizeKeyboardCode } from "@/domains/shortcuts/utils";

function createKeyboardChannel() {
  return eventChannel<string[]>((emit) => {
    let pressed: string[] = [];
    const upListener = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!_.isEmpty(pressed)) {
        if (_.isEqual(["escape"], pressed)) {
          emit(END);
        }
      }
      pressed = [];
    };
    const downListener = (e: KeyboardEvent) => {
      e.preventDefault();
      pressed.push(normalizeKeyboardCode(e.code));
      pressed = _.uniq(pressed);
      pressed.sort((a, b) => {
        const getWeight = (n: string) => {
          const weights = {
            shift: 2,
            ctrl: 1,
          };
          return n in weights ? weights[n] : 0;
        };
        return getWeight(b) - getWeight(a);
      });
      emit(pressed);
    };
    document.addEventListener("keydown", downListener);
    document.addEventListener("keyup", upListener);
    return () => {
      document.removeEventListener("keydown", downListener);
      document.removeEventListener("keyup", upListener);
    };
  });
}
function* shortcutsEditorSaga(): SagaIterator {
  const chan = yield* call(createKeyboardChannel);
  try {
    while (true) {
      const combo = yield* take(chan);
      yield* put(setEditorPressedCombo(combo));
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (yield* cancelled()) {
      chan.close();
    } else {
      yield* put(closeEditor());
    }
  }
}
export default function* main() {
  while (yield* take(openEditor.type)) {
    const task = yield* fork(shortcutsEditorSaga);

    yield* take(closeEditor.type);
    yield* cancel(task);
  }
}
