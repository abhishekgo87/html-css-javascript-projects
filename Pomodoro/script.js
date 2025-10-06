const timer = document.querySelector('.timer');
const title = document.querySelector('.title'); // ✅ Fixed selector
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountsDisplay = document.querySelector('.pomoCountDisplay');

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let timerID = null;
let oneRoundCompleted = false;
let totalCount = 0;
let paused = false;
let remainingTime = WORK_TIME;

const updateTitle = (msg) => {
  title.textContent = msg;
}

const saveLocalCounts = () => {
  let counts = JSON.parse(localStorage.getItem("pomoCounts"));
  counts = counts ? counts + 1 : 1;
  localStorage.setItem("pomoCounts", JSON.stringify(counts));
}

const countDown = () => {
  const mins = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const secs = Math.floor(remainingTime % 60).toString().padStart(2, '0');
  timer.textContent = `${mins}:${secs}`;  // ✅ Fixed format

  remainingTime--;
  if (remainingTime < 0) {
    stopTimer();
    if (!oneRoundCompleted) {
      remainingTime = BREAK_TIME;
      timerID = startTimer();
      oneRoundCompleted = true;
      updateTitle("It's Break Time!");
    } else {
      updateTitle("Completed 1 Round of Pomodoro Technique!");
      setTimeout(() => updateTitle("Start Timer Again!"), 2000);
      totalCount++;
      saveLocalCounts();
      showPomoCounts();
      oneRoundCompleted = false;
      remainingTime = WORK_TIME;
    }
  }
};

const startTimer = () => {
  if (timerID) stopTimer();
  return setInterval(countDown, 1000);
}

const stopTimer = () => {
  clearInterval(timerID);
  timerID = null;
}

startBtn.addEventListener('click', () => {
  remainingTime = WORK_TIME;
  timerID = startTimer();
  paused = false;
  updateTitle("It's Work Time");
});

pauseBtn.addEventListener('click', () => {
  if (!paused) {
    stopTimer();
    paused = true;
    updateTitle("Paused");
  }
});

resumeBtn.addEventListener('click', () => {
  if (paused) {
    timerID = startTimer();
    paused = false;
    updateTitle(oneRoundCompleted ? "It's Break Time!" : "It's Work Time");
  }
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  oneRoundCompleted = false;
  remainingTime = WORK_TIME;
  timer.textContent = "25:00";
  updateTitle("Click Start for Work Time");
});

const showPomoCounts = () => {
  const counts = JSON.parse(localStorage.getItem("pomoCounts"));
  if (counts > 0) {
    pomoCountsDisplay.style.display = "flex";
    pomoCountsDisplay.firstElementChild.textContent = counts;
  }
}

showPomoCounts();
