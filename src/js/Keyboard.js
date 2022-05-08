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

    this.toggleActiveButton();
  }

  _createKeys(languach) {
    const fragment = document.createDocumentFragment();

    keys.forEach(({ keyCode, en, ua, universalButton }) => {
      const keyElement = document.createElement('div');

      const countLanguach = languach === 'en' ? en.normal : ua.normal;

      if (universalButton) {
        keyElement.classList.add('keys', keyCode);
        keyElement.innerHTML = countLanguach;
        keyElement.setAttribute('name', keyCode);
      } else {
        keyElement.classList.add('keys');
        keyElement.innerHTML = countLanguach;
        keyElement.setAttribute('name', keyCode);
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  }

  toggleActiveButton() {
    const keysDOM = document.querySelectorAll('[name]');

    window.addEventListener('keydown', e => toggleButton(e, 'add'));
    window.addEventListener('keyup', e => toggleButton(e, 'remove'));

    function toggleButton(e, toggle) {
      keysDOM.forEach(key => {
        const attribute = key.getAttribute('name');

        if (attribute === e.code) {
          key.classList[toggle]('active');
        }
      });
    }
  }
}
