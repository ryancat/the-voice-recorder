// Canvas renderer
export class CanvasRenderer {
  offscreenElement = document.createElement('canvas')
  element: HTMLCanvasElement
  dirty = false

  constructor({
    element
  }: {
    element: HTMLCanvasElement | JSX.Element
  }) {
    this.element = element;
  }

  resize(width: number, height: number, element = this.offscreenElement) {
    if (element.width !== width || element.height !== height) {
      element.width = width;
      element.height = height;
    }
  }

  putOnScreen() {
    const context = this.element.getContext('2d');
    const width = this.offscreenElement.width;
    const height = this.offscreenElement.height;

    // Make sure on screen canvas element has good width
    this.resize(width, height, this.element);
    
    if (context) {
      // TODO: this is experimental
      // Draw image could be expensive
      context.drawImage(this.offscreenElement, 0, 0, width, height);
    }
  }
}