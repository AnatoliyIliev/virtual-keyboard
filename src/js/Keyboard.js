/* eslint-disable no-param-reassign */
import keys from './keys';

export default class Keyboard {
  constructor() {
    this.capsLock = false;
    this.languach = localStorage.getItem('lang') === 'ua' ? 'ua' : 'en';
  }

  refs = {
    body: document.querySelector('body'),

  };

  init() {
    this.main = document.createElement('div');
    this.main.classList.add('container');
    this.main.innerHTML = '<h1 class="title">RSS Virtual Keyboard</h1><textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>';
    this.keysContainer = document.createElement('div');
    this.keysContainer.classList.add('keyboard');
    this.text = document.createElement('div');
    this.text.classList.add('text');
    this.text.innerHTML = `
      Клавиатура создана в операционной системе Windows <br>
      Для переключения языка комбинация: Ctrl + ALt`;

    this.keysContainer.appendChild(this.createKeys(this.languach));
    this.main.appendChild(this.text);
    this.main.appendChild(this.keysContainer);
    this.refs.body.appendChild(this.main);
  }

  createKeys(languach) {
    this.fragment = document.createDocumentFragment();

    keys.forEach(({
      keyCode, en, ua, universalButton,
    }) => {
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

      this.fragment.appendChild(keyElement);
    });
    return this.fragment;
  }

  changeButton() {
    const keysDOM = document.querySelectorAll('[name]');
    const capsLockSelector = document.querySelector('.CapsLock');
    this.textarea = document.querySelector('.textarea');

    document.addEventListener('keydown', (e) => this.toggleButton(e, 'add'));
    document.addEventListener('keyup', (e) => this.toggleButton(e, 'remove'));

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && !e.repeat) {
        this.changeLanguach();
      }
    });

    this.toggleButton = (e, toggle) => {
      this.textarea.focus();
      if (e.code === 'CapsLock' && toggle === 'add') {
        capsLockSelector.classList.toggle('active');
        this.capsLock = !this.capsLock;
      }

      keysDOM.forEach((keyD) => {
        const attribute = keyD.getAttribute('name');

        if (attribute === e.code && e.code !== 'CapsLock') {
          keyD.classList[toggle]('active');
        }

        keys.forEach((k) => {
          const onCapsLock = k[this.languach].capsLock;
          const onShift = k[this.languach].shift;

          switch (e.key) {
            case 'CapsLock':
              if (this.capsLock) {
                if (onCapsLock && k.keyCode === attribute) {
                  keyD.innerHTML = onCapsLock;
                }
              } else if (!this.capsLock) {
                if (onCapsLock && k.keyCode === attribute) {
                  keyD.innerHTML = k[this.languach].normal;
                }
              }
              break;

            case 'Shift':
              if (onShift && k.keyCode === attribute) {
                if (toggle === 'add') {
                  if (this.capsLock) {
                    if (k.number) {
                      keyD.innerHTML = k[this.languach].shift;
                    } else { keyD.innerHTML = k[this.languach].normal; }
                  } else { keyD.innerHTML = onShift; }
                } else if (toggle === 'remove') {
                  if (this.capsLock) {
                    if (k.number) {
                      keyD.innerHTML = k[this.languach].normal;
                    } else { keyD.innerHTML = k[this.languach].shift; }
                  } else if (!this.capsLock) {
                    keyD.innerHTML = k[this.languach].normal;
                  } else { keyD.innerHTML = onShift; }
                }
              }
              break;

            case 'ArrowUp':
              if (toggle === 'remove') {
                this.textarea.selectionStart = 0;
                this.textarea.selectionEnd = this.textarea.selectionStart;
              }
              break;
            case 'ArrowDown':
              if (toggle === 'remove') {
                this.textarea.selectionEnd = this.textarea.textLength;
                this.textarea.selectionStart = this.textarea.selectionEnd;
              }
              break;
            case 'ArrowLeft':
              if (toggle === 'remove') {
                this.textarea.selectionStart = Math.max(0, this.textarea.selectionStart - 1);
                this.textarea.selectionEnd = this.textarea.selectionStart;
              }
              break;
            case 'ArrowRight':
              if (toggle === 'remove') {
                this.textarea.selectionStart = Math.min(
                  this.textarea.textLength,
                  this.textarea.selectionEnd + 1,
                );
                this.textarea.selectionEnd = this.textarea.selectionStart;
              }
              break;
            case 'Tab':
              if (toggle === 'remove') {
                this.tabAndEnterTap('\t');
              }
              break;
            case 'Enter':
              if (toggle === 'remove') {
                this.tabAndEnterTap('\n');
              }
              break;
            case 'Delete':
              if (toggle === 'remove') {
                this.pressDelete();
              }
              break;
            default:
              break;
          }
        });
      });
    };
    this.keysContainer.addEventListener('click', (event) => {
      const clikcEvent = event.target.getAttribute('name');

      this.textarea.focus();
      const keyDown = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        code: clikcEvent,
        view: window,
      });
      document.dispatchEvent(keyDown);

      this.textarea.focus();
      const keyUp = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        code: clikcEvent,
        view: window,
      });
      document.dispatchEvent(keyUp);
    });
  }

  changeLanguach() {
    const keysDOM = document.querySelectorAll('[name]');
    const capsLock = this.capsLock ? 'shift' : 'normal';

    this.languach = this.languach === 'ua' ? 'en' : 'ua';

    localStorage.setItem('lang', this.languach);

    keysDOM.forEach((keyD) => {
      const attribute = keyD.getAttribute('name');

      keys.forEach((k) => {
        const onCapsLock = k[this.languach].capsLock;
        if (k.keyCode === attribute) {
          if (onCapsLock) { keyD.innerHTML = k[this.languach][capsLock]; }
        }
      });
    });
  }

  tabAndEnterTap(chars) {
    this.textarea = document.querySelector('.textarea');
    const cursorAt = this.textarea.selectionStart;

    this.textarea.value = this.textarea.value.slice(0, cursorAt)
      + chars
      + this.textarea.value.slice(this.textarea.selectionEnd);

    this.textarea.selectionStart = cursorAt + chars.length;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  pressBackspace() {
    this.textarea = document.querySelector('.textarea');
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.insertText('');
    } else {
      const cursorAt = Math.max(0, this.textarea.selectionStart - 1);

      this.textarea.value = this.textarea.value.slice(0, cursorAt)
        + this.textarea.value.slice(this.textarea.selectionEnd);

      this.textarea.selectionStart = cursorAt;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }

  pressDelete() {
    this.textarea = document.querySelector('.textarea');
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.insertText('');
    } else {
      const cursorAt = this.textarea.selectionStart;

      this.textarea.value = this.textarea.value.slice(0, cursorAt)
        + this.textarea.value.slice(cursorAt + 1);

      this.textarea.selectionStart = cursorAt;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }
}
