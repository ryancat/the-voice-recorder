// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Recorder } from '../components/Recorder';

const mapStateToProps = () => ({});

export const RecorderContainer = connect(
  mapStateToProps
)(Recorder);
