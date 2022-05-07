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

    this.main.classList.add('keyboard');
    this.keysContainer.classList.add('keyboard__keys');
    this.keysContainer.appendChild(this._createKeys());

    this.keys = this.keysContainer.querySelectorAll('.keyboard__key');

    this.main.appendChild(this.keysContainer);
    document.body.appendChild(this.main);

    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', currentValue => {
        element.value = currentValue;
      });
    });
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      'backtick',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      'backspace',
      'tab',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '[',
      ']',
      '\\',
      'del',
      'capslock',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ';',
      "'",
      'enter',
      'leftshift',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '/',
      'uparrow',
      'rightshift',
      'leftctrl',
      'win',
      'leftalt',
      'spacebar',
      'rightalt',
      'leftarrow',
      'downarrow',
      'rightarrow',
      'rightctrl',
    ];

    const createIcon = iconName => {
      return `<i class="icons">${iconName}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreack =
        ['backspace', 'del', 'enter', 'shift', 'ctrl'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('backspase');

          keyElement.addEventListener('click', () => {
            this.value = this.value.substring(0, this.value.length - 1);
            this._trigerEvent('onInput');
          });
          break;

        case 'capslock':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
          );
          keyElement.innerHTML = createIcon('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.capsLock);
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.value += '\n';
            this._trigerEvent('onInput');
          });
          break;

        case 'spase':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIcon('space_bar');

          keyElement.addEventListener('click', () => {
            this.value += ' ';
            this._trigerEvent('onInput');
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.value += this.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._trigerEvent('onInput');
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreack) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  _toggleCapsLock() {
    this.capsLock = !this.capsLock;

    for (const key of this.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  }

  _trigerEvent(handlerName) {
    console.log(this.value);
    if (typeof handlerName == 'function') {
      handlerName(this.value);
    }
  }

  render() {}
}
