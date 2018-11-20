import { SagaIterator } from 'redux-saga';
import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects'
import { IAction, RecorderActionType } from './types';

function* getEnumerateDevices(action: IAction): SagaIterator {
  try {
    if (!navigator.mediaDevices || 
      !navigator.mediaDevices.enumerateDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      throw new Error('Environment doesn\'t support media devices API');
    }

    const devices = yield call(navigator.mediaDevices.enumerateDevices);
    yield put({
      type: RecorderActionType.GET_ENUMERATE_DEVICES_SUCCEEDED,
      devices,
    })
  }
  catch (e) {
    yield put({
      type: RecorderActionType.GET_ENUMERATE_DEVICES_FAILED,
      message: e.message,
    })
  }
}

function* recorderSaga() {
  yield takeLatest(RecorderActionType.GET_ENUMERATE_DEVICES, getEnumerateDevices);
}

export function* saga() {
  yield all([
    call(recorderSaga)
  ])
}