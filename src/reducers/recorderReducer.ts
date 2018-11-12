import uuid from 'uuid/v1';
import produce from 'immer';
import { 
  RecorderActionType, 
  IRecording,
  RecorderUIState,
  IAction,
} from '../types';

const defaultState: {
  ui: RecorderUIState;
  data: IRecording;
} = {
  ui: RecorderUIState.Ready,
  data: {
    id: uuid(),
    name: 'R1',
    sections: [{
      startTime: 0,
      endTime: 0
    }]
  },
}

export function recorderReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    case RecorderActionType.GO_TO_READY:
      return produce(state, draftState => {
        // draftState.imageUrl = action.imageUrl
      })

    default:
      return state;
  }
}