import { RecorderActionType } from '../types';

export function goToReady() {
  return {
    type: RecorderActionType.GO_TO_READY,
  };
}
