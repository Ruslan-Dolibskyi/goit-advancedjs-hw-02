function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId = null;
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', () => {
  if (intervalId !== null) {
    return;
  }

  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});

stopButton.disabled = true; // Make sure stop button is initially disabled
