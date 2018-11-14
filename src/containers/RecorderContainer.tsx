import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Recorder } from '../components/Recorder';

const mapStateToProps = (state) => ({});

export const RecorderContainer = withRouter(connect(
  mapStateToProps
)(Recorder));
