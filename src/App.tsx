import React, { Component, createRef } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  private playerRef = createRef<HTMLAudioElement>()

  constructor(props: object) {
    super(props);
    
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      // Get audo input device
      devices = devices.filter(d => d.kind === 'audioinput');

      navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: devices[0].deviceId
        },
        video: false
      })
      .then(this.handleSuccess.bind(this));
    });
  }

  handleSuccess(stream: MediaStream) {
    const player: HTMLAudioElement | null = this.playerRef.current;

    if (!player) {
      // Environment doesn't support HTML5
      console.warn('Need HTML5 support to run app');
      return;
    }

    // Feature detection
    // if (window.URL) {
    //   player.src = window.URL.createObjectURL(stream);
    // }
    // else {
    //   player.src = stream.toString();
    // }

    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);
  }
  
  render() {
    return (
      <div className="App">
        <audio ref={this.playerRef} controls></audio>
      </div>
    );
  }
}

export default App;
