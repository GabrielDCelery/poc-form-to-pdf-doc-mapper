import * as PIXI from 'pixi.js';
import PixiConfigurerEventBus from './PixiConfigurerEventBus';

export class PdfPixiMenu {
  constructor(_stage) {
    this.eventBus = new PixiConfigurerEventBus();
    this.stage = _stage;
    this.menu = new PIXI.Graphics()
      .drawRect(0, 0, 200, 100);

    const menuItem = new PIXI.Graphics()
      .beginFill(0xeeeeee)
      .lineStyle(1, 0xaaaaaa)
      .drawRect(0, 0, 200, 50);

    const menuItem2 = new PIXI.Graphics()
      .beginFill(0xeeeeee)
      .lineStyle(1, 0xaaaaaa)
      .drawRect(0, 0, 200, 50)
    menuItem2.position.set(0, 50);

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 14,
    });

    const addInputField = new PIXI.Text('Add input field', style);
    addInputField.anchor.set(0.5, 0.5);
    addInputField.position.set(100, 25);

    const addCheckboxField = new PIXI.Text('Add checkbox field', style);
    addCheckboxField.anchor.set(0.5, 0.5);
    addCheckboxField.position.set(100, 25);

    menuItem.addChild(addInputField);
    menuItem2.addChild(addCheckboxField);

    this.menu.addChild(menuItem);
    this.menu.addChild(menuItem2);

    const self = this;
    menuItem.interactive = true;
    menuItem.on('pointerdown', function (event) {
      self.close();
    });
    menuItem.on('mouseover', function (event) {
      this
        .clear()
        .beginFill(0xaaaaaa)
        .lineStyle(1, 0xaaaaaa)
        .drawRect(0, 0, 200, 50);
    });
    menuItem.on('mouseout', function (event) {
      this
        .clear()
        .beginFill(0xeeeeee)
        .lineStyle(1, 0xaaaaaa)
        .drawRect(0, 0, 200, 50);

    });
    menuItem2.interactive = true;
    menuItem2.on('pointerdown', function (event) {
      self.close();
    });
    menuItem2.on('mouseover', function (event) {
      this
        .clear()
        .beginFill(0xaaaaaa)
        .lineStyle(1, 0xaaaaaa)
        .drawRect(0, 0, 200, 50);
    });
    menuItem2.on('mouseout', function (event) {
      this
        .clear()
        .beginFill(0xeeeeee)
        .lineStyle(1, 0xaaaaaa)
        .drawRect(0, 0, 200, 50);
    });

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(_position) {
    this.position = _position;
    const { x, y } = this.position;
    this.stage.removeChild(this.menu);
    this.menu.position.x = x;
    this.menu.position.y = y;
    this.stage.addChild(this.menu);
  }

  close() {
    this.stage.removeChild(this.menu);
  }
}