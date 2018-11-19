import React from 'react';
import styled from 'styled-components';

const StyledAudioViz = styled.div`
  // Styles for AudioViz component
  width: 100%;
  height: 61.8%;
`;

export class AudioViz extends React.Component {
  canvasRef = React.createRef<HTMLCanvasElement>()
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <StyledAudioViz>
        <canvas ref={this.canvasRef}></canvas>
      </StyledAudioViz>
    )
  }
}
