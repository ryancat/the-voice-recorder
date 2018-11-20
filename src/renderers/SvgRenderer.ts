import { IRenderer, RendererElement, RendererType } from '../types';

// SVG renderer
const SVG_NS = 'http://www.w3.org/2000/svg';

export class SvgRenderer implements IRenderer {
  element: SVGSVGElement
  dirty = false
  type = RendererType.SVG

  constructor() {
    this.element = this.creatSvgElement('svg') as SVGSVGElement;
  }

  private addToElement(element: SVGElement, attrs: {[key: string]: string | number | boolean}): void {
    for (let key in attrs) {
      let val = attrs[key];
      if (val !== undefined) {
        element.setAttributeNS(null, key, val.toString());
      }
    }
  }

  private creatSvgElement(tag: string): SVGElement {
    return document.createElementNS(SVG_NS, tag);
  }

  resize(width: number, height: number): void {
    this.addToElement(this.element, {
      width,
      height,
    })
  }

  drawToElement(element: RendererElement): void {}

  /**
   * Custom type guard
   */
  private static isSVGSVGElement(element: RendererElement): element is SVGSVGElement {
    return element instanceof SVGSVGElement;
  }
}