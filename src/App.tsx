/// <reference path='index.d.ts' />

import React, { Component, createRef } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  private playerRef = createRef<HTMLAudioElement>()
  private audioVisualRef = createRef<HTMLCanvasElement>()
  private mediaRecorder: MediaRecorder | null = null
  private audioContext: AudioContext = new AudioContext()
  private chunks: any[] = []
  private loopBatch: Array<() => void> = []

  public state = {
    isRecording: false
  }

  constructor(props: object) {
    super(props);

    this.startAudioSource();
    this.tick();
    this.listen();
  }

  listen() {
    window.addEventListener('resize', this.resizeCanvas.bind(this));
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
    this.initMediaRecorder(stream);
    this.initAudioViz(stream);
  }

  tick() {
    this.loopBatch.forEach(loopCallback => {
      loopCallback()
    });

    // Loop
    requestAnimationFrame(this.tick.bind(this));
  }

  resizeCanvas() {
    const canvas = this.audioVisualRef.current;
    if (!canvas) {
      // TODO: put all this into animation loop
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = canvas.width * 0.2;
  }

  initAudioViz(stream: MediaStream) {
    // Process audio and visualize it
    const source = this.audioContext.createMediaStreamSource(stream);
    const analyser = this.audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    // analyser.connect(this.audioContext.destination);

    // Resize canvas
    this.resizeCanvas()
    this.loopBatch.push(() => {
      this.drawAudioViz(analyser, dataArray);
    });
  }

  drawAudioViz(analyser: AnalyserNode, dataArray: Uint8Array) {
    const canvas = this.audioVisualRef.current;
    if (!canvas) {
      // TODO: put all this into animation loop
      return;
    }

    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) {
      return;
    }

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const bufferLength = dataArray.length;

    analyser.getByteTimeDomainData(dataArray);
    
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    const sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {

      const v = dataArray[i] / 128.0;
      let y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
  }

  initMediaRecorder(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);

    // Binding event handlers
    this.mediaRecorder.ondataavailable = this.handleMediaRecorderDataAvailable.bind(this);
    this.mediaRecorder.onstart = this.handleMediaRecorderStart.bind(this);
    this.mediaRecorder.onstop = this.handleMediaRecorderStop.bind(this);
  }

  handleMediaRecorderDataAvailable(evt: MediaRecorderDataAvailableEvent) {
    this.chunks.push(evt.data);
  }

  handleMediaRecorderStart() {
    console.log('start recording');
    this.setState({
      isRecording: true
    });   
  }

  handleMediaRecorderStop() {
    console.log('stop recording');
    this.setState({
      isRecording: false
    }) 

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

  startRecord() {
    if (!this.mediaRecorder) {
      return;
    }

    if (!this.state.isRecording) {
      this.mediaRecorder.start();
    }
  }

  stopRecord() {
    if (!this.mediaRecorder) {
      return;
    }

    if (this.state.isRecording) {
      this.mediaRecorder.stop();
    }
  }
  
  render() {
    return (
      <div className="app">
        <canvas ref={this.audioVisualRef}></canvas>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px'
          }}>
          <button 
            onClick={this.startRecord.bind(this)}
            style={{
              backgroundColor: this.state.isRecording ? 'red' : 'green'
            }}>Record</button>
          <button 
            onClick={this.stopRecord.bind(this)}
            style={{
              backgroundColor: '#c1c1c1'
            }}>Stop</button>
          {this.state.isRecording ? null : <audio ref={this.playerRef} controls></audio>}
        </div>
      </div>
    );
  }
}

export default App;
