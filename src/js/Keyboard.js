import keys from './keys.js';

export default class Keyboard {
  constructor() {
    this.capsLock = false;
    this.languach = 'en';
  }

  refs = {
    body: document.querySelector('body'),
  };

  init() {
    this.main = document.createElement('div');
    this.main.classList.add('container');
    this.main.innerHTML = `<h1 class="title">Virtual keyboard</h1><textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>`;
    this.keysContainer = document.createElement('div');
    this.keysContainer.classList.add('keyboard');

    this.keysContainer.appendChild(this._createKeys(this.languach));

    this.main.appendChild(this.keysContainer);
    this.refs.body.appendChild(this.main);
  }

  _createKeys(languach) {
    const fragment = document.createDocumentFragment();

    keys.forEach(({ keyCode, en, ua, universalButton }) => {
      const keyElement = document.createElement('div');

      const countLanguach = languach === 'en' ? en.normal : ua.normal;

      if (universalButton) {
        keyElement.classList.add('keys', keyCode);
        keyElement.innerHTML = en.normal;
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
    const capsLockSelector = document.querySelector('.CapsLock');

    // const capsLock = this.capsLock ? 'shift' : 'normal';
    // const countLanguach = languach === 'en' ? en[capsLock] : ua[capsLock];

    window.addEventListener('keydown', e => toggleButton(e, 'add'));
    window.addEventListener('keyup', e => toggleButton(e, 'remove'));

    const toggleButton = (e, toggle) => {
      if (e.code === 'CapsLock' && toggle == 'add') {
        capsLockSelector.classList.toggle('active');
        this.capsLock = !this.capsLock;
      }

      keysDOM.forEach(key => {
        const attribute = key.getAttribute('name');

        if (attribute === e.code && e.code !== 'CapsLock') {
          key.classList[toggle]('active');
        }

        keys.forEach(k => {
          const onCapsLock = k[this.languach].capsLock;
          const onShift = k[this.languach].shift;

          switch (e.key) {
            case 'CapsLock':
              if (this.capsLock) {
                if (onCapsLock && k.keyCode === attribute) {
                  key.innerHTML = onCapsLock;
                }
              } else if (!this.capsLock) {
                if (onCapsLock && k.keyCode === attribute) {
                  key.innerHTML = k[this.languach].normal;
                }
              }
              break;

            case 'Shift':
              if (toggle == 'add' && onShift && k.keyCode === attribute) {
                key.innerHTML = onShift;
              } else if (
                toggle == 'remove' &&
                onShift &&
                k.keyCode === attribute
              ) {
                key.innerHTML = k[this.languach].normal;
              }
              break;
          }
        });
      });
    };
  }

  _upperLowerLetter() {}
}
