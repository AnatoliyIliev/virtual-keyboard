import keysEN from './keysEN.js';
import getRefs from './get-refs.js';
const refs = getRefs();

export default class Keyboard {
  constructor() {
    this.main = null;
    this.keysContainer = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
  }

  init() {
    this.main = document.createElement('div');
    this.main.classList.add('container');
    this.main.innerHTML = `<h1 class="title">Virtual keyboard</h1><textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>`;
    this.keysContainer = document.createElement('div');
    this.keysContainer.classList.add('keyboard');
    this.keysContainer.appendChild(this._createKeys());
    this.main.appendChild(this.keysContainer);
    refs.body.appendChild(this.main);
  }

  _createKeys() {
    const fragment = document.createDocumentFragment();

    keysEN.forEach(key => {
      const keyElement = document.createElement('div');

      // const firstSumbol =
      //   ['`', 'Tab', 'Caps Lock', 'leftshift', 'leftctrl'].indexOf(key) !== -1;

      // const lastSumbol =
      //   ['Backspace', 'Del', 'Enter', 'rightshift'].indexOf(key) !== -1;

      // if (lastSumbol) {
      //   fragment.appendChild(document.createElement('br'));
      // }
      switch (key) {
        case 'Backspace':
          keyElement.classList.add('key', 'backspace_key');
          keyElement.innerHTML = 'Backspace';
          break;
        case 'Tab':
          keyElement.classList.add('key', 'tab_key');
          keyElement.innerHTML = 'Tab';
          break;
        case 'Caps Lock':
          keyElement.classList.add('key', 'caps_lock_key');
          keyElement.innerHTML = 'Caps Lock';
          break;
        case 'Enter':
          keyElement.classList.add('key', 'enter_key');
          keyElement.innerHTML = 'Enter';
          break;
        case 'leftshift':
          keyElement.classList.add('key', 'shift_key');
          keyElement.innerHTML = 'Shift';
          break;
        case 'rightshift':
          keyElement.classList.add('key', 'shift_key');
          keyElement.innerHTML = 'Shift';
          break;
        case 'leftctrl':
          keyElement.classList.add('key', 'left_ctrl');
          keyElement.innerHTML = 'Ctrl';
          break;
        case 'rightctrl':
          keyElement.classList.add('key', 'right_ctrl');
          keyElement.innerHTML = 'Ctrl';
          break;
        case 'leftalt':
          keyElement.classList.add('key');
          keyElement.innerHTML = 'Alt';
          break;
        case 'rightalt':
          keyElement.classList.add('key');
          keyElement.innerHTML = 'Alt';
          break;
        case 'space':
          keyElement.classList.add('key', 'space_key');
          keyElement.innerHTML = 'Space';
          break;
        case 'uparrow':
          keyElement.classList.add('key', 'uparrow');
          keyElement.innerHTML = '▲';
          break;
        case 'rightarrow':
          keyElement.classList.add('key', 'rightarrow');
          keyElement.innerHTML = '▲';
          break;
        case 'leftarrow':
          keyElement.classList.add('key', 'leftarrow');
          keyElement.innerHTML = '▲';
          break;
        case 'downarrow':
          keyElement.classList.add('key', 'downarrow');
          keyElement.innerHTML = '▲';
          break;
        default:
          keyElement.classList.add('key');
          keyElement.textContent = key;
          break;
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  }
}
