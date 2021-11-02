import { all } from 'redux-saga/effects';
import connect from './connect';
import events from './events';
import channels from './channels';
import message from './message';

export default function* phoenixSaga() {
  yield all([
    connect(),
    events(),
    channels(),
    message(),
  ])
}