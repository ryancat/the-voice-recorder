import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RecorderComponent } from '../components/Recorder';

const mapStateToProps = (state) => ({});

export const RecorderContainer = withRouter(connect(
  mapStateToProps
)(RecorderComponent));
