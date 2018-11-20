import { RecorderActionType } from '../types';

export function goToReady() {
  return {
    type: RecorderActionType.GO_TO_READY,
  };
}

export function getEnumerateDevices() {
  return {
    type: RecorderActionType.GET_ENUMERATE_DEVICES,
  }
}
