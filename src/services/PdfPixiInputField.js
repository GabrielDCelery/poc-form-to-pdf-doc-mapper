import * as PIXI from 'pixi.js';

let id = 0;

export class PdfPixiInputField {
  constructor(_parent, _position) {
    id++;
    this.id = id;
    this.parent = _parent;
    this.inputField = new PIXI.Graphics()
      .beginFill(0xeeeeee)
      .lineStyle(2, 0xaaaaaa)
      .drawRect(0, 0, 200, 40);
    const { x, y } = _position;
    this.positionX = x;
    this.positionY = y;
    this.inputField.alpha = 0.5;
    this.inputField.position.x = this.positionX;
    this.inputField.position.y = this.positionY;
    this.sizeX = 200;
    this.sizeY = 40;

    this.inputFieldCloser = new PIXI.Graphics()
      .beginFill(0xcc0000)
      .lineStyle(2, 0x333333)
      .drawRect(0, 0, 20, 20);
    this.inputFieldCloser.position.x = this.inputField.position.x + this.sizeX;
    this.inputFieldCloser.position.y = this.inputField.position.y - this.sizeY / 2;

    this.inputFieldResizer = new PIXI.Graphics()
      .beginFill(0x777777)
      .lineStyle(2, 0x333333)
      .drawRect(0, 0, 20, 20);
    this.inputFieldResizer.position.x = this.inputField.position.x + this.sizeX;
    this.inputFieldResizer.position.y = this.inputField.position.y + this.sizeY;

    this._initInputFieldEventListeners();
    this._initInputFieldResizerEventListeners();
    this._initInputFieldCloserEventListeners();
    this.parent.addChild(this.inputField);
    this.parent.addChild(this.inputFieldResizer);
    this.parent.addChild(this.inputFieldCloser);
    this.create = this.create.bind(this);
    this.destroy = this.destory.bind(this);
  }

  _initInputFieldEventListeners() {
    const self = this;
    this.inputField.interactive = true;
    this.inputField
      .on('pointerdown', function onDragStart(event) {
        self.inputField.data = event.data;
        self.inputField.dragging = true;
      })
      .on('pointerup', function onDragEnd() {
        self.inputField.dragging = false;
        self.inputField.data = null;
      })
      .on('pointerupoutside', function onDragEnd() {
        self.inputField.dragging = false;
        self.inputField.data = null;
      })
      .on('pointermove', function onDragMove() {
        if (self.inputField.dragging) {
          const newPosition = self.inputField.data.getLocalPosition(this.parent);
          self.positionX = newPosition.x;
          self.positionY = newPosition.y;
          self.inputField.x = newPosition.x;
          self.inputField.y = newPosition.y;
          self.inputFieldResizer.position.x = self.inputField.position.x + self.sizeX;
          self.inputFieldResizer.position.y = self.inputField.position.y + self.sizeY;
          self.inputFieldCloser.position.x = self.inputField.position.x + self.sizeX;
          self.inputFieldCloser.position.y = self.inputField.position.y - self.sizeY / 2;
        }
      });
  }

  _initInputFieldResizerEventListeners() {
    const self = this;
    this.inputFieldResizer.interactive = true;

    this.inputFieldResizer
      .on('pointerdown', function onResizeStart(event) {
        self.inputFieldResizer.data = event.data;
        self.inputFieldResizer.resizing = true;
      })
      .on('pointerup', function onResizeEnd() {
        self.inputFieldResizer.dragging = false;
        self.inputFieldResizer.resizing = null;
      })
      .on('pointerupoutside', function onResizeEnd() {
        self.inputFieldResizer.dragging = false;
        self.inputFieldResizer.resizing = null;
      })
      .on('pointermove', function onResizeMove() {
        if (self.inputFieldResizer.resizing) {
          const newPosition = self.inputFieldResizer.data.getLocalPosition(this.parent);
          const { x, y } = newPosition;
          self.parent.removeChild(self.inputField);
          self.sizeX = x - self.positionX;
          self.sizeY = y - self.positionY;
          self.inputField = new PIXI.Graphics()
            .beginFill(0xeeeeee)
            .lineStyle(2, 0xaaaaaa)
            .drawRect(0, 0, self.sizeX, self.sizeY);
          self.inputField.alpha = 0.5;
          self.inputField.position.x = self.positionX;
          self.inputField.position.y = self.positionY;
          self._initInputFieldEventListeners();
          self.parent.addChild(self.inputField);
          self.inputFieldResizer.position.x = newPosition.x;
          self.inputFieldResizer.position.y = newPosition.y;
          self.inputFieldCloser.position.x = newPosition.x;
          self.inputFieldCloser.position.y = newPosition.y - self.sizeY - 20;
        }
      });
  }

  _initInputFieldCloserEventListeners() {
    const self = this;
    this.inputFieldCloser.interactive = true;

    this.inputFieldCloser
      .on('pointerdown', function () {
        self.destory();
      });
  }

  create() {
    this.parent.addChild(this.inputField);
  }

  destory() {
    this.parent.removeChild(this.inputField);
    this.parent.removeChild(this.inputFieldResizer);
    this.parent.removeChild(this.inputFieldCloser);
    this.inputField.destroy();
    this.inputField = null;
  }

  getState() {
    return {
      size: { x: this.sizeX, y: this.sizeY },
      position: { x: this.positionX, y: this.positionY }
    }
  }

  getId() {
    return this['id'];
  }
}