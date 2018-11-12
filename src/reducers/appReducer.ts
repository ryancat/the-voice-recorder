import produce from 'immer';
import { 
  AppMode,
  AppActionType,
  IAction,
} from '../types';

const defaultState = {
  mode: AppMode.Recorder,
};

export function appReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    case AppActionType.GO_TO_PLAYER_MODE:
      return produce(state, draftState => {
        draftState.mode = AppMode.Player;
      })

    case AppActionType.GO_TO_RECORDER_MODE:
      return produce(state, draftState => {
        draftState.mode = AppMode.Recorder;
      })

    default:
      return state;
  }
}
