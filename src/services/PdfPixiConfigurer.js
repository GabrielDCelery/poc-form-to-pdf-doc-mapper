import * as PIXI from 'pixi.js';
import { PdfPixiMenu } from './PdfPixiMenu';
import PixiConfigurerEventBus from './PixiConfigurerEventBus';
import { PdfPixiInputField } from './PdfPixiInputField';

export class PdfPixiConfigurer {
  constructor(_canvasContainer, _resourceConfigs = []) {
    this.eventBus = new PixiConfigurerEventBus();
    this.activePage = null;
    this.sprites = {};
    this.canvasContainer = _canvasContainer;
    this.canvasWidth = this.canvasContainer.current.offsetWidth * 0.9;
    this.canvasHeight = Math.round(this.canvasWidth / 2480 * 3508);
    this.pixiApp = new PIXI.Application({
      width: this.canvasWidth,
      height: this.canvasHeight,
      transparent: true
    });
    this.canvasContainer.current.appendChild(this.pixiApp.view);
    this.pdfPixiMenu = new PdfPixiMenu(this.pixiApp.stage);
    this.eventBus.registerObserver(this.eventBus.EVENT_RESOURCES_LOADED, () => {
      this.setActivePage(1);
    });
    this._initInteractiveCanvas();
    this._loadResources(_resourceConfigs);
    this.inputFields = {};
    this.eventBus.registerObserver(this.eventBus.EVENT_CREATE_INPUT_FIELD, _position => {
      const inputField = new PdfPixiInputField(this.pixiApp.stage, _position)

      this.inputFields[inputField.getId()] = inputField;
    });
  }

  _initInteractiveCanvas() {
    const self = this;
    const { stage, view } = this.pixiApp;

    view.oncontextmenu = _event => _event.preventDefault();

    stage.interactive = true;
    stage.hitArea = new PIXI.Rectangle(0, 0, this.canvasWidth, this.canvasHeight);
    stage
      .on('pointerdown', function () {
        self.pdfPixiMenu.close();
      })
      /*
      .on('touchstart', () => { console.log('touchstart')})
      .on('mouseup', () => { console.log('mouseup')})
      .on('mouseupoutside', () => { console.log('mouseupoutside')})
      .on('touchend', () => { console.log('touchend')})
      .on('touchendoutside', () => { console.log('touchendoutside')})
      */
      .on('rightdown', function (event) {
        self.pdfPixiMenu.open(event.data.getLocalPosition(this));
      })
      .on('rightup', () => { });
  }

  _loadResources(_resourceConfigs) {
    const loader = new PIXI.loaders.Loader();
    _resourceConfigs.forEach((_resourceConfig, _index) => {
      loader.add(
        this._createPageKey(_resourceConfig['page']),
        _resourceConfig['url'],
        { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BLOB }
      );
    });
    loader.load((_loader, _resources) => {
      _resourceConfigs.forEach((_resourceConfig, _index) => {
        const _key = this._createPageKey(_resourceConfig['page']);
        this.sprites[_key] = new PIXI.Sprite(_resources[_key]['texture']);
      });
      this.eventBus.emit(this.eventBus.EVENT_RESOURCES_LOADED);
    });
  }

  _getSprite(_page) {
    return this.sprites[this._createPageKey(_page)] || null;
  }

  _createPageKey(_page) {
    return `page_${_page}`;
  }

  setActivePage(_page) {
    this.pixiApp.stage.removeChild(this._getSprite(this.activePage));
    this.activePage = _page;

    const _newSprite = this._getSprite(this.activePage);
    const _scale = this.canvasWidth / _newSprite.width;

    _newSprite.scale.x *= _scale;
    _newSprite.scale.y *= _scale;

    this.pixiApp.stage.addChild(_newSprite);

    return this;
  }
}