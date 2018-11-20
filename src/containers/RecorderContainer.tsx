// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Recorder } from '../components/Recorder';
import { getEnumerateDevices } from '../actions/recorderAction';
import { IDispatch } from '../types';

// Make something like this
// export type SideBarProps = SideBarState & MapDispatchProps & InjectedIntlProps;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: IDispatch) => ({
  getEnumerateDevices: () => dispatch(getEnumerateDevices()),
});

export const RecorderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recorder);

// navigator.mediaDevices.enumerateDevices()
//     .then(devices => {
//       // Get audo input device
//       devices = devices.filter(d => d.kind === 'audioinput');

//       navigator.mediaDevices.getUserMedia({
//         audio: {
//           deviceId: devices[0].deviceId
//         },
//         video: false
//       })
//       .then(this.handleSuccess.bind(this))
//       .catch(err => {
//         throw new Error(`navigator.mediaDevices.getUserMedia doesn\'t support: ${err}`);
//       });
//     })
//     .catch(err => {
//       throw new Error(`navigator.mediaDevices.enumerateDevices doesn\'t support: ${err}`);
//     });