const timer = document.querySelector('.timer');
const tittle = document.querySelector('.tittle');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');

const WORK_TIME = 1* 60;
const BREAK_TIME = 5 * 60;
let timerID = null;
let oneRoundCompleted = false;


const updateTitle = (msg) => {
tittle.textContent = msg;
}

const countDown = (time) => {
  return () => {

 timer.textContent = time;
  time--;
  if(time < 0) {
     stopTimer();
     if(!oneRoundCompleted) {
       timerID = startTimer(BREAK_TIME);
      oneRoundCompleted = true;
     }
  }
  }
 

}

const startTimer = (startTime) => {
  if(timerID !== null){
    stopTimer();
  }
  return  setInterval(countDown(startTime), 1000);
}

const stopTimer = () => {
  clearInterval(timerID);
  timerID = null;
}


startBtn.addEventListener('click', ()=>{
  timerID =  startTimer(WORK_TIME);

});
