import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { App } from '../components/App';

const mapStateToProps = () => ({})

// export const AppContainer = withRouter(connect(
//   mapStateToProps
// )(App));

export const AppContainer = connect<{}>(
  mapStateToProps
)(App);
