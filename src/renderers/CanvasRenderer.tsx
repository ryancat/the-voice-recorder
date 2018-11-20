import { IRendererOptions, IRenderer, RendererElement, RendererType } from '../types';

// Canvas renderer
export class CanvasRenderer implements IRenderer {
  offscreenElement = document.createElement('canvas')
  dirty = false
  type = RendererType.Canvas

  constructor(options: IRendererOptions) {
  }

  resize(width: number, height: number, element = this.offscreenElement): void {
    if (element.width !== width || element.height !== height) {
      element.width = width;
      element.height = height;
    }
  }

  drawToElement(element: RendererElement): void {
    if (!CanvasRenderer.isHTMLCanvasElement(element)) {
      return;
    }

    const context = element.getContext('2d');
    const width = this.offscreenElement.width;
    const height = this.offscreenElement.height;

    // Make sure on screen canvas element has good width
    this.resize(width, height, element);
    
    if (context) {
      // TODO: this is experimental
      // Draw image could be expensive
      context.drawImage(this.offscreenElement, 0, 0, width, height);
    }
  }

  /**
   * Custom type guard
   */
  private static isHTMLCanvasElement(element: RendererElement): element is HTMLCanvasElement {
    return element instanceof HTMLCanvasElement;
  }
}