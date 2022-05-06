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
    this.keysContainer = document.createElement('div');

    this.main.classList.add('keyboard');
    this.keysContainer.classList.add('keyboard__keys');
    // this.keysContainer.appendChild(this._createKeys());

    this.keys = this.keysContainer.querySelectorAll('.keyboard__key');

    this.main.appendChild(this.keysContainer);
    document.body.appendChild(this.main);

    // refs.ourFriendsSlider.insertAdjacentHTML('beforeend', card.join(''));
  }
}
