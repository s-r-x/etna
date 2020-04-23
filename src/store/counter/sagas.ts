import {put, debounce} from 'redux-saga/effects';
import {inc, dec, delayDec, delayInc} from './slice';

const TIMEOUT = 500;

function* delayIncSaga() {
  yield put(inc());
}
function* delayDecSaga() {
  yield put(dec());
}
export default function* counterSaga() {
  yield debounce(TIMEOUT, delayInc().type, delayIncSaga);
  yield debounce(TIMEOUT, delayDec().type, delayDecSaga);
}
