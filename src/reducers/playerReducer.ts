import produce from 'immer';
import { 
  // RecorderActionType, 
  IRecording,
  PlayerUIState,
  IAction,
} from '../types';

const defaultState: {
  ui: PlayerUIState;
  data: {
    recording?: IRecording;
    pausedTime?: number;
  };
} = {
  ui: PlayerUIState.Ready,
  data: {},
}

export function playerReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    // case RecorderActionType.GO_TO_READY:
    //   return produce(state, draftState => {
    //     // draftState.imageUrl = action.imageUrl
    //   })

    default:
      return state;
  }
}