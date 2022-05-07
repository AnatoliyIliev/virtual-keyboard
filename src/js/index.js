import Keyboard from './Keyboard';
import keysEN from './keysEN.js';
import '../scss/style.scss';

const keyboard = new Keyboard();
keyboard.init();
// keyboard.createKeys();

console.log(keyboard);
// console.log(keyboard.toString());
