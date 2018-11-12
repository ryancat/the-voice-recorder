import { AppActionType } from '../types';

export function goToPlayerMode() {
  return {
    type: AppActionType.GO_TO_PLAYER_MODE,
  };
}

export function goToRecorderMode() {
  return {
    type: AppActionType.GO_TO_RECORDER_MODE,
  };
}
