import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { RecorderContainer } from '../containers/RecorderContainer';

export const App = styled(({className}: {
  className: string;
}) => {
  return (
    <div id='the-voice-recorder-app' className={className}>
        <Route path='/' component={RecorderContainer} />
        {/* <Route path='/edit' component={EditPageContainer} /> */}
    </div>
  )
})`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`