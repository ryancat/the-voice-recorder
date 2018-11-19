import React from 'react';
import styled from 'styled-components';
import { AudioViz } from './AudioViz';
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

export class Recorder extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <StyledRecorder>
        <AudioViz></AudioViz>
        {/* <ControlPanel></ControlPanel> */}
      </StyledRecorder>
    )
  }
}
