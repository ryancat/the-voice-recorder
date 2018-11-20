// Qestion: How to use Refs so that I don't need to check if it's null all the time?

import React from 'react';
import styled from 'styled-components';
import { CanvasRenderer } from '../renderers/CanvasRenderer';
import { SvgRenderer } from '../renderers/SvgRenderer';
import { IAudioViz, RendererType } from '../types';

const StyledAudioViz = styled.div`
  // Styles for AudioViz component
  width: 100%;
  height: 61.8%;
`;

type Renderer = CanvasRenderer | SvgRenderer;

export class AudioViz extends React.Component<IAudioViz> {
  private loopBatch: Array<() => void> = []
  private renderer: Renderer | undefined = undefined
  private cachedRendererMap: Partial<Record<RendererType, Renderer>> = {}

  constructor(props: IAudioViz) {
    super(props);
    this.tick();
  }

  componentDidMount() {
    // When component mount, the viz element will be in DOM
    this.loopBatch.push(this.update.bind(this));    
  }

  // checkRefs() {
  //   const canvas = this.canvasRef.current;
  //   const container = this.containerRef.current;

  //   if (!container || !canvas) {
  //     throw new Error('AudioViz component is not ready');
  //   }
  // }

  // initCanvas() {
  //   this.loopBatch.push(() => {
  //     this.drawAudioViz(analyser, dataArray);
  //   });
  // }

  tick() {
    // Go through all loop callbacks to execute them
    this.loopBatch.forEach(loopCallback => loopCallback());
    requestAnimationFrame(this.tick.bind(this));
  }

  /**
   * The main loop function for audio viz element
   */
  update() {
    if (this.renderer && this.renderer.dirty) {
      // Update the renderer with animation loop
      this.renderer.resize(this.props.width, this.props.height);

      this.renderer.putOnScreen();
      this.renderer.dirty = false;
    }
  }

  /**
   * Switch to the current renderer type from props
   */
  switchRenderer() {
    let element;
    
    // Switch to the correponding renderer.
    // If not exist in cache, create one.
    switch(this.props.rendererType) {
      case RendererType.Canvas:
        if (typeof this.cachedRendererMap[RendererType.Canvas] === 'undefined') {
          element = <canvas></canvas>
          this.cachedRendererMap[RendererType.Canvas] = new CanvasRenderer({
            element: element
          });
        }
        
        this.renderer = this.cachedRendererMap[RendererType.Canvas];
        break;

      case RendererType.SVG:
        if (typeof this.cachedRendererMap[RendererType.SVG] === 'undefined') {
          this.cachedRendererMap[RendererType.SVG] = new SvgRenderer();
        }

        this.renderer = this.cachedRendererMap[RendererType.SVG];
        break;

      default:
        throw new Error(`Unexpected renderer type: ${this.props.rendererType}`)
    }

    return element;
  }

  getVizElement() {
    this.switchRenderer();

    if (!this.renderer) {
      throw new Error('AudioViz renderer not found');
    }

    // Dirty the viz element
    this.renderer.dirty = true;

    return this.renderer.element;
  }

  render() {
    return (
      <StyledAudioViz>
        {this.getVizElement()}
      </StyledAudioViz>
    )
  }
}
