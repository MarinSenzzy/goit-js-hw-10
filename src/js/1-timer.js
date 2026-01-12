import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const ref = {
  DataDays: document.querySelector('[data-days]'),
  DataHours: document.querySelector('[data-hours]'),
  DataMinutes: document.querySelector('[data-minutes]'),
  DataSeconds: document.querySelector('[data-seconds]'),
  startButton: document.querySelector('[data-start]'),
  inputCalendar: document.querySelector('#datetime-picker'),
};
const iziToastOptions = {
  message: 'Please choose a date in the future',
  closeOnClick: true,
  close: false,
  icon: 'material-icons',
  iconText: 'error_outline',
  position: 'topRight',
  transitionIn: 'fadeInLeft',
  transitionOut: 'fadeOutLeft',
};
ref.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (new Date() > userSelectedDate) {
      iziToast.error(iziToastOptions);
      ref.startButton.disabled = true;
      return;
    }
    ref.startButton.disabled = false;
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};
function updTimer({ days, hours, minutes, seconds }) {
  ref.DataDays.textContent = addLeadingZero(days);
  ref.DataHours.textContent = addLeadingZero(hours);
  ref.DataMinutes.textContent = addLeadingZero(minutes);
  ref.DataSeconds.textContent = addLeadingZero(seconds);
}
flatpickr('#datetime-picker', options);
ref.startButton.addEventListener('click', handleStartTimer);

function handleStartTimer(event) {
  ref.inputCalendar.disabled = true;
  ref.startButton.disabled = true;
  if (new Date() > userSelectedDate) {
    iziToast.error(iziToastOptions);
    ref.inputCalendar.disabled = false;
    return;
  }

  const IdTimer = setInterval(() => {
    const diff = userSelectedDate - new Date();
    if (diff <= 0) {
      clearInterval(IdTimer);
      ref.inputCalendar.disabled = false;
      updTimer(convertMs(0));
      return;
    }

    updTimer(convertMs(diff));
  }, 1000);
}
