import React from 'react';
import styled from 'styled-components';

const StyledRecorderComponent = styled.div`
  // Styles for recorder component
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

export class RecorderComponent extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <StyledRecorderComponent>
        <AudioViz></AudioViz>
        <ControlPanel></ControlPanel>
      </StyledRecorderComponent>
    )
  }
}
