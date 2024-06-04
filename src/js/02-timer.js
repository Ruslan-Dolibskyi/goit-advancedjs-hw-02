import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
let countdownInterval;
let isTimerRunning = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      dateTimePicker.disabled = true;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  if (!startButton.disabled) {
    const selectedDate = new Date(dateTimePicker.value);
    startCountdown(selectedDate);
    isTimerRunning = true;
    startButton.disabled = true;
  }
});

function startCountdown(endDate) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = endDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      isTimerRunning = false;
      return;
    }

    const time = convertMs(timeRemaining);
    updateTimerUI(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent =
    addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
