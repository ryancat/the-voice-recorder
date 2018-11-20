import { Action, Dispatch } from 'redux';
import { CanvasRenderer } from './renderers/CanvasRenderer';
import { SvgRenderer } from './renderers/SvgRenderer';

/***** Enums *****/
export enum RecorderActionType {
  GO_TO_READY = 'GO_TO_READY',
  GET_ENUMERATE_DEVICES = 'GET_ENUMERATE_DEVICES',
  GET_ENUMERATE_DEVICES_FAILED = 'GET_ENUMERATE_DEVICES_FAILED',
  GET_ENUMERATE_DEVICES_SUCCEEDED = 'GET_ENUMERATE_DEVICES_SUCCEEDED',
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

export enum RendererType {
  Canvas = 'canvas',
  SVG = 'svg',
}

export enum VizType {
  Line = 'line',
}

/***** Types *****/
export type Renderer = CanvasRenderer | SvgRenderer;

export type RendererElement = HTMLCanvasElement | SVGElement;

/***** Interfaces *****/
// Actions
export interface IAction extends Action<RecorderActionType | AppActionType> {}

// Dispatches
export interface IDispatch extends Dispatch<IAction> {}

// Component Props
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

export interface IRecorderProps {
  getEnumerateDevices: () => void;
}

export interface IAudioViz {
  // Allow audio viz to render with different renderer.
  // RendererType.Canvas is good enough in most of the cases
  rendererType: RendererType,
  width: number,
  height: number,
  // Currently only support line chart
  type: VizType,
  // analyser: AnalyserNode,
  // The audio viz are using streaming data, not static data
  // dataValues: number[],
}

// Classes
/**
 * T: element type
 */
export interface IRenderer {
  type: RendererType;
  dirty: boolean;
  drawToElement(element: RendererElement): void;
  resize(width: number, height: number): void;
}

// Others
export interface IRendererOptions {
}