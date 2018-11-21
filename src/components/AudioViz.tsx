// Qestion: How to use Refs so that I don't need to check if it's null all the time?

import React from 'react';
import styled from 'styled-components';
import { CanvasRenderer } from '../renderers/CanvasRenderer';
import { SvgRenderer } from '../renderers/SvgRenderer';
import { IAudioViz, RendererType, IRenderer, RendererElement } from '../types';

const StyledAudioViz = styled.div`
  // Styles for AudioViz component
`;

export class AudioViz extends React.Component<IAudioViz> {
  private readonly canvasRef = React.createRef<HTMLCanvasElement>()
  private readonly svgRef = React.createRef<SVGSVGElement>()
  private vizElement?: RendererElement
  private loopBatch: Array<() => void> = []
  private renderer?: IRenderer
  private cachedRendererMap: Partial<Record<RendererType, IRenderer>> = {}

  constructor(props: IAudioViz) {
    super(props);
    this.tick();
  }

  componentDidMount() {
    // Now the viz elements are available, we will need to connect them with the
    // corresponding renderer
    this.updateRenderer();

    // When component mount, the viz element will be in DOM
    this.loopBatch.push(this.update.bind(this));    
  }

  componentDidUpdate() {
    this.updateRenderer();
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

      // Draw on the viz element
      if (this.vizElement) {
        this.renderer.drawToElement(this.vizElement);
      }
      
      // Dirty the renderer to render on the next frame
      this.renderer.dirty = false;
    }
  }

  updateRenderer() {
    // Switch to the correponding renderer.
    // If not exist in cache, create one.
    switch(this.props.rendererType) {
      case RendererType.Canvas:
        if (typeof this.cachedRendererMap[RendererType.Canvas] === 'undefined') {
          this.cachedRendererMap[RendererType.Canvas] = new CanvasRenderer();
        }
        
        this.renderer = this.cachedRendererMap[RendererType.Canvas];
        if (this.canvasRef.current) {
          this.vizElement = this.canvasRef.current;
        }
        break;

      case RendererType.SVG:
        if (typeof this.cachedRendererMap[RendererType.SVG] === 'undefined') {
          this.cachedRendererMap[RendererType.SVG] = new SvgRenderer();
        }

        this.renderer = this.cachedRendererMap[RendererType.SVG];
        if (this.svgRef.current) {
          this.vizElement = this.svgRef.current;
        }
        break;

      default:
        throw new Error(`Unexpected renderer type: ${this.props.rendererType}`)
    }

    if (!this.renderer) {
      throw new Error('AudioViz renderer not found');
    }

    // Dirty the viz element
    this.renderer.dirty = true;
  }


  //   if (!this.renderer) {
  //     throw new Error('AudioViz renderer not found');
  //   }

  //   // Dirty the viz element
  //   this.renderer.dirty = true;

  //   return element;
  // }

  render() {
    return (
      <StyledAudioViz>
        <canvas
          ref={this.canvasRef}
          style={{
            display: this.props.rendererType === RendererType.Canvas ? 'block' : 'none'
          }}></canvas>
        <svg
          ref={this.svgRef}
          style={{
            display: this.props.rendererType === RendererType.SVG ? 'block' : 'none'
          }}
        ></svg>
      </StyledAudioViz>
    )
  }
}
