// SVG renderer
const SVG_NS = 'http://www.w3.org/2000/svg';

export class SvgRenderer {
  element: SVGElement
  dirty = false

  constructor() {
    this.element = this.creatSvgElement('svg');
  }

  private addToElement(element: SVGElement, attrs: {[key: string]: string | number | boolean}) {
    for (let key in attrs) {
      let val = attrs[key];
      if (val !== undefined) {
        element.setAttributeNS(null, key, val.toString());
      }
    }
  }

  private creatSvgElement(tag: string) {
    return document.createElementNS(SVG_NS, tag);
  }

  resize(width: number, height: number) {
    this.addToElement(this.element, {
      width,
      height,
    })
  }

  putOnScreen() {}
}