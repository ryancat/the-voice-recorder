import React from 'react';
// import { dispatch } from 'redux';
import styled from 'styled-components';
import { AudioViz } from './AudioViz';
import { RendererType, VizType, IRecorderProps } from '../types';
// import ControlPanel from './ControlPanel';

const StyledRecorder = styled.div`
  // Styles for recorder component
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

export class Recorder extends React.Component<IRecorderProps> {
  containerRef = React.createRef<HTMLDivElement>()
  // private mediaRecorder: MediaRecorder | null = null
  // private audioContext: AudioContext = new AudioContext()
  // private chunks: any[] = []

  state = {
    audioVizWidth: 0,
    audioVizHeight: 0,
  }

  constructor(props: IRecorderProps) {
    super(props);
    // this.startAudioSource();
  }

  componentDidMount() {
    this.setState({
      audioVizWidth: this.containerRef.current ? this.containerRef.current.clientWidth : 0,
      audioVizHeight: this.containerRef.current ? this.containerRef.current.clientHeight * 0.618 : 0,
    })
  }

  // /**
  //  * Start audio source to get audio data
  //  */
  // startAudioSource() {
  //   if (!navigator.mediaDevices || 
  //     !navigator.mediaDevices.enumerateDevices ||
  //     !navigator.mediaDevices.getUserMedia
  //   ) {
  //     throw new Error('Environment doesn\'t support media devices API');
  //   }

  //   navigator.mediaDevices.enumerateDevices()
  //   .then(devices => {
  //     // Get audo input device
  //     devices = devices.filter(d => d.kind === 'audioinput');

  //     navigator.mediaDevices.getUserMedia({
  //       audio: {
  //         deviceId: devices[0].deviceId
  //       },
  //       video: false
  //     })
  //     .then(this.handleSuccess.bind(this))
  //     .catch(err => {
  //       throw new Error(`navigator.mediaDevices.getUserMedia doesn\'t support: ${err}`);
  //     });
  //   })
  //   .catch(err => {
  //     throw new Error(`navigator.mediaDevices.enumerateDevices doesn\'t support: ${err}`);
  //   });
  // }

  render() {
    return (
      <StyledRecorder ref={this.containerRef}>
        <AudioViz
          rendererType={RendererType.Canvas}
          width={this.state.audioVizWidth}
          height={this.state.audioVizHeight}
          type={VizType.Line}
          // analyser={this.analyser}
        ></AudioViz>
        {/* <ControlPanel></ControlPanel> */}
      </StyledRecorder>
    )
  }
}
