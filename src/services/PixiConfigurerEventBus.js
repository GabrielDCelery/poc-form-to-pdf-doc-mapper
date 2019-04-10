import EventEmitter from 'event-emitter';

let SINGLETON = null;

class PixiConfigurerEventBus {
  constructor() {
    if (SINGLETON) {
      return SINGLETON;
    }
    this.eventEmitter = new EventEmitter();
    this.registeredFunctions = {};
    this._initListeners();

    SINGLETON = this;
  }

  _initListeners() {
    this.EVENT_RESOURCES_LOADED = 'EVENT_RESOURCES_LOADED';
    this.EVENT_CREATE_INPUT_FIELD = 'EVENT_CREATE_INPUT_FIELD';
    this.registeredFunctions[this.EVENT_RESOURCES_LOADED] = [];

    this.eventEmitter.on(this.EVENT_RESOURCES_LOADED, () => {
      this.registeredFunctions[this.EVENT_RESOURCES_LOADED].forEach(_registeredFunction => {
        return _registeredFunction.apply(undefined, arguments);
      });
    });
  }

  emit(_eventName) {
    this.eventEmitter.emit(_eventName);
  }

  registerObserver(_eventName, _function) {
    this.registeredFunctions[_eventName].push(_function);

    return this;
  }
}

export default PixiConfigurerEventBus;