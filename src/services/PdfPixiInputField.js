import * as PIXI from 'pixi.js';

export class PdfPixiInputField {
  constructor(_parent) {
    this.parent = _parent;
    this.inputField = new PIXI.Graphics()
      .beginFill(0xeeeeee)
      .lineStyle(1, 0xaaaaaa)
      .drawRect(0, 0, 200, 50);
    this._initEventListeners();
  }

  _initEventListeners() {

  }

  create() {
    this.parent.addChild(this.inputField);
  }

  destory() {
    this.parent.removeChild(this.inputField);
    this.inputField.destroy();
  }
}