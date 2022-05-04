// import keys from './keys.js';

export default class Keyboard {
  constructor() {
    this.main = null;
    this.keysContainer = null;
    this.keys = [];
    this.onInput = null;
    this.onClose = null;
    this.value = '';
    this.capsLock = false;
  }

  //   elements() {
  //     this.main = null;
  //     this.keysContainer = null;
  //     this.keys = [];
  //   }

  //   eventHandlers() {
  //     this.onInput = null;
  //     this.onClose = null;
  //   }

  //   properties() {
  //     this.value = '';
  //     this.capsLock = false;
  //   }

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard-hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  }

  _createKeys() {
    const fragment = document.createDocumentFragment();
  }
}
