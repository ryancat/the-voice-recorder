/// <reference path='index.d.ts' />

import React, { Component, createRef } from 'react';
import logo from './logo.svg';
import './App.scss';

// Declares
// declare const MediaRecorder: any;

class App extends Component {
  private playerRef = createRef<HTMLAudioElement>()
  private mediaRecorder: MediaRecorder | null = null
  private chunks: any[] = []

  constructor(props: object) {
    super(props);
    this.startAudioSource();
  }

  /**
   * Start audio source to get audio data
   */
  startAudioSource() {
    if (!navigator.mediaDevices || 
      !navigator.mediaDevices.enumerateDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      return console.warn('Environment doesn\'t support media devices API');
    }

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
      .then(this.handleSuccess.bind(this))
      .catch(err => {
        console.warn('navigator.mediaDevices.getUserMedia doesn\'t support', err);
      });
    })
    .catch(err => {
      console.warn('navigator.mediaDevices.enumerateDevices doesn\'t support', err);
    });
  }

  /**
   * Handle getting audio source media stream
   * @param stream The audio media stream to be processed
   */
  handleSuccess(stream: MediaStream) {
    // const player = this.playerRef.current;

    // if (!player) {
    //   // Environment doesn't support HTML5
    //   console.warn('Need HTML5 support to run app');
    //   return;
    // }

    // Feature detection
    // if (window.URL) {
    //   player.src = window.URL.createObjectURL(stream);
    // }
    // else {
    //   player.src = stream.toString();
    // }

    // const context = new AudioContext();
    // const source = context.createMediaStreamSource(stream);
    // const processor = context.createScriptProcessor(1024, 1, 1);

    // source.connect(processor);
    // processor.connect(context.destination);

    // processor.onaudioprocess = (evt) => {
    //   console.log(evt.inputBuffer);
    // };

    this.initMediaRecorder(stream);
  }

  initMediaRecorder(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (evt: MediaRecorderDataAvailableEvent) => {
      this.chunks.push(evt.data);
    }

    this.mediaRecorder.onstart = () => {
      console.log('start recording');
    }

    this.mediaRecorder.onstop = () => {
      console.log('stop recording');

      const blob = new Blob(this.chunks, {
        type: 'audio/ogg; codecs=opus'
      });
      this.chunks = [];
      
      const player = this.playerRef.current;

      if (!player) {
        // Environment doesn't support HTML5
        console.warn('Need HTML5 support to run app');
        return;
      }

      // Feature detection
      if (window.URL) {
        player.src = window.URL.createObjectURL(blob);
      }
    }
  }

  startRecord() {
    if (!this.mediaRecorder) {
      return;
    }

    this.mediaRecorder.start();
  }

  stopRecord() {
    if (!this.mediaRecorder) {
      return;
    }

    this.mediaRecorder.stop();
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.startRecord.bind(this)}>Record</button>
        <button onClick={this.stopRecord.bind(this)}>Stop</button>
        <audio ref={this.playerRef} controls></audio>
      </div>
    );
  }
}

export default App;
