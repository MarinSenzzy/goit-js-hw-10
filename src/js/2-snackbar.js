import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', createNotification);
function createNotification(event) {
  event.preventDefault();
  const { delay, state } = event.target.elements;

  const delayTime = Number(delay.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state.value === 'fulfilled'
        ? resolve(`✅ Fulfilled promise in ${delayTime}ms`)
        : reject(`❌ Rejected promise in ${delayTime}ms`);
    }, delayTime);
  });

  promise
    .then(success => {
      console.log(success);

      iziToast.show({
        message: success,
        closeOnClick: true,
        close: false,
        position: 'topRight',
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutLeft',
        progressBar: false,
        color: 'green',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        closeOnClick: true,
        close: false,
        position: 'topRight',
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutLeft',
        progressBar: false,
        color: 'red',
      });
    });
}
