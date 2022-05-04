import keyLayout from './keys.js';

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

  init() {
    this.main = document.createElement('div');
    this.keysContainer = document.createElement('div');

    this.main.classList.add('keyboard', 'keyboard--hidden');
    this.keysContainer.classList.add('keyboard__keys');

    this.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  }

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const createIcon = iconName => {
      return `<i class="icons">${iconName}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreack =
        ['backspace', 'del', 'enter', 'shift', 'ctrl'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
    });
  }
}
