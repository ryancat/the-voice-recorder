import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { RecorderContainer } from '../containers/RecorderContainer';

class App extends React.Component<RouteComponentProps<{}> & {className: string}, any> {
  render() {
    return (
      <div id='the-voice-recorder-app' className={this.props.className}>
          <Route path='/' component={RecorderContainer} />
          {/* <Route path='/edit' component={EditPageContainer} /> */}
      </div>
    );
  }
}

// export const App = styled(({className, RouteComponentProps<{}>}: {
//   className: string;
//   match: object;
//   location: object;
//   history: object;
// }) => {
//   return (
//     <div id='the-voice-recorder-app' className={className}>
//         <Route path='/' component={RecorderContainer} />
//         {/* <Route path='/edit' component={EditPageContainer} /> */}
//     </div>
//   )
// })`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
// `