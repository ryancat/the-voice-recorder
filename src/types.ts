/***** Enums *****/
export enum RecorderActionType {
  GO_TO_READY = 'GO_TO_READY',
}

export enum AppActionType {
  GO_TO_RECORDER_MODE = 'GO_TO_RECORDER_MODE',
  GO_TO_PLAYER_MODE = 'GO_TO_PLAYER_MODE',
}

export enum RecorderUIState {
  Ready,
  Recording,
  Paused,
  Stopped,
  EditingName,
  EditingCover,
}

export enum PlayerUIState {
  Ready,
  Selected,
  Playing,
  Paused,
}

export enum AppMode {
  Recorder,
  Player,
}

/***** Interfaces *****/
export interface IAction {
  type: RecorderActionType | AppActionType;
  data?: object;
}

export interface IRecording {
  // image url
  cover?: string;
  id: string;
  name: string;
  sections: Array<{
    startTime: number;
    endTime: number;
    blob?: object;
  }>;
}
