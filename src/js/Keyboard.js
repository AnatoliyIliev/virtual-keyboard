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
        keyElement.setAttribute('key', keyCode);
        keyElement.setAttribute('id', keyCode);
      } else {
        keyElement.classList.add('keys');
        keyElement.innerHTML = countLanguach;
        keyElement.setAttribute('key', keyCode);
        keyElement.setAttribute('id', keyCode);
      }

      this.fragment.appendChild(keyElement);
    });
    return this.fragment;
  }

  changeButton() {
    const capsLockSelector = document.querySelector('.CapsLock');
    this.textarea = document.querySelector('.textarea');

    document.addEventListener('keyup', (e) => {
      const activeKey = document.getElementById(e.code);

      if (e.key === 'Shift') {
        e.preventDefault();
        this.pressShiftKey(e, 'remove');
      }
      if (!activeKey) {
        e.preventDefault();
      }

      if (activeKey && e.code !== 'CapsLock') {
        setTimeout(() => {
          activeKey.classList.remove('active');
        }, 150);
      }
    });

    document.addEventListener('keydown', (e) => {
      this.textarea.focus();
      const metaButton = [];
      keys.forEach((k) => {
        if (k.universalButton) {
          metaButton.push(k.keyCode);
        }
      });
      const activeKey = document.getElementById(e.code);
      if (!activeKey) {
        e.preventDefault();
        return;
      }
      if (activeKey && e.code !== 'CapsLock') {
        activeKey.classList.add('active');
      }
      if ((e.ctrlKey || e.metaKey) && e.altKey && !e.repeat) {
        this.changeLanguach();
      } else if (e.code === 'CapsLock') {
        e.preventDefault();
        this.capsLock = !this.capsLock;
        capsLockSelector.classList.toggle('active');
        this.toggleCapsLog(e);
      } else if (e.key === 'Shift') {
        e.preventDefault();
        this.pressShiftKey(e, 'add');
      } else if (e.code === 'Tab') {
        e.preventDefault();
        this.textInput('\t');
      } else if (e.code === 'Space') {
        e.preventDefault();
        this.textInput(' ');
      } else if (e.code === 'Backspace') {
        e.preventDefault();
        this.backspaceButton();
      } else if (e.code === 'Enter') {
        e.preventDefault();
        this.textInput('\n');
      } else if (e.code === 'Delete') {
        e.preventDefault();
        this.pressDelete();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.textarea.selectionStart = 0;
        this.textarea.selectionEnd = this.textarea.selectionStart;
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.textarea.selectionEnd = this.textarea.textLength;
        this.textarea.selectionStart = this.textarea.selectionEnd;
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.textarea.selectionStart = Math.max(0, this.textarea.selectionStart - 1);
        this.textarea.selectionEnd = this.textarea.selectionStart;
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.textarea.selectionStart = Math.min(
          this.textarea.textLength,
          this.textarea.selectionEnd + 1,
        );
        this.textarea.selectionEnd = this.textarea.selectionStart;
      } else if (!metaButton.includes(e.code)) {
        e.preventDefault();
        this.textInput(activeKey.textContent);
      }
    });

    this.keysContainer.addEventListener('click', (event) => {
      this.textarea.focus();
      const keyDown = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        code: event.target.id,
        view: window,
      });
      document.dispatchEvent(keyDown);

      this.textarea.focus();
      const keyUp = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        code: event.target.id,
        view: window,
      });
      document.dispatchEvent(keyUp);
    });
  }

  pressShiftKey(e, toggle) {
    const keysDOM = document.querySelectorAll('[key]');
    keysDOM.forEach((keyD) => {
      const attribute = keyD.getAttribute('key');

      keys.forEach((k) => {
        const onShift = k[this.languach].shift;

        if (onShift && k.keyCode === attribute) {
          if (toggle === 'add') {
            if (this.capsLock) {
              if (k.number) {
                e.preventDefault();
                keyD.innerHTML = k[this.languach].shift;
              } else { keyD.innerHTML = k[this.languach].normal; }
            } else { keyD.innerHTML = onShift; }
          } else if (toggle === 'remove') {
            if (this.capsLock) {
              if (k.number) {
                e.preventDefault();
                keyD.innerHTML = k[this.languach].normal;
              } else { keyD.innerHTML = k[this.languach].shift; }
            } else if (!this.capsLock) {
              e.preventDefault();
              keyD.innerHTML = k[this.languach].normal;
            } else { keyD.innerHTML = onShift; }
          }
        }
      });
    });
  }

  backspaceButton() {
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.insertText('');
    } else {
      const cursor = Math.max(0, this.textarea.selectionStart - 1);

      this.textarea.value = this.textarea.value.slice(0, cursor)
      + this.textarea.value.slice(this.textarea.selectionEnd);

      this.textarea.selectionStart = cursor;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }

  toggleCapsLog(e) {
    const keysDOM = document.querySelectorAll('[key]');
    keysDOM.forEach((keyD) => {
      const attribute = keyD.getAttribute('key');

      keys.forEach((k) => {
        const onCapsLock = k[this.languach].capsLock;

        if (this.capsLock) {
          e.preventDefault();
          if (onCapsLock && k.keyCode === attribute) {
            keyD.innerHTML = onCapsLock;
          }
        } else if (!this.capsLock) {
          if (onCapsLock && k.keyCode === attribute) {
            e.preventDefault();
            keyD.innerHTML = k[this.languach].normal;
          }
        }
      });
    });
  }

  changeLanguach() {
    const keysDOM = document.querySelectorAll('[key]');
    const capsLock = this.capsLock ? 'shift' : 'normal';

    this.languach = this.languach === 'ua' ? 'en' : 'ua';

    localStorage.setItem('lang', this.languach);

    keysDOM.forEach((keyD) => {
      const attribute = keyD.getAttribute('key');

      keys.forEach((k) => {
        const onCapsLock = k[this.languach].capsLock;
        if (k.keyCode === attribute) {
          if (onCapsLock) { keyD.innerHTML = k[this.languach][capsLock]; }
        }
      });
    });
  }

  textInput(text) {
    this.textarea = document.querySelector('.textarea');
    const cursorAt = this.textarea.selectionStart;

    this.textarea.value = this.textarea.value.slice(0, cursorAt)
          + text
          + this.textarea.value.slice(this.textarea.selectionEnd);

    this.textarea.selectionStart = cursorAt + text.length;
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
