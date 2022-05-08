import keys from './keys.js';
import getRefs from './get-refs.js';
const refs = getRefs();

export default class Keyboard {
  constructor() {
    this.capsLock = false;
    this.shift = false;
    this.languach = 'en';
  }

  init() {
    this.main = document.createElement('div');
    this.main.classList.add('container');
    this.main.innerHTML = `<h1 class="title">Virtual keyboard</h1><textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>`;
    this.keysContainer = document.createElement('div');
    this.keysContainer.classList.add('keyboard');
    this.keysContainer.appendChild(this._createKeys(this.languach));
    this.main.appendChild(this.keysContainer);
    refs.body.appendChild(this.main);
  }

  _createKeys(languach) {
    const fragment = document.createDocumentFragment();

    keys.forEach(({ keyCode, en, ru, universalButton }) => {
      const keyElement = document.createElement('div');

      const countLanguach = languach === 'en' ? en.normal : ru.normal;

      if (universalButton) {
        keyElement.classList.add('key', keyCode);
        keyElement.innerHTML = countLanguach;
      } else {
        keyElement.classList.add('key');
        keyElement.innerHTML = countLanguach;
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  }
}
