import keys from './keys.js';
import getRefs from './get-refs.js';
const refs = getRefs();

window.addEventListener('keydown', toggleButton);

refs.keysEvent.forEach(key => {
  key.addEventListener('click', () => {
    console.log('fasdf');
  });
});

function toggleButton(e) {
  console.log(refs.container);

  //   refs.keysEvent.forEach(key => {
  //     console.log(e);
  //     console.log(key);
  // if (e.code === keyCode) {

  // console.log(keyCode);
  // refs.keys.classList.add('active');
  // }
  //   });
}
