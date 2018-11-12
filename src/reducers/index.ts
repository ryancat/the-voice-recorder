import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { recorderReducer } from './recorderReducer';
import { playerReducer } from './playerReducer';

export default combineReducers({
  // Reducers go here
  app: appReducer,
  recorder: recorderReducer,
  player: playerReducer,
});
