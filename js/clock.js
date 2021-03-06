import {quizList} from "./quiz.js";
export {count, countDown, addCount, delCount, sleep}
function clock() {
  // 現在の日時・時刻の情報を取得
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();
  let dayNum = d.getDay();
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = weekday[dayNum];
  let hour = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();

  // 1桁の場合は先頭に0をつける
  if (month < 10){
    month = "0"+month;
  }
  if (date < 10){
    date = "0"+date;
  }
  if (hour < 10) {
    hour = "0"+hour;
  }
  if (min < 10){
    min = "0"+min;
  }
  if (sec < 10){
    sec = "0"+sec;
  }

  let today = `${year}.${month}.${date}.${day}`;
  let time = `${hour}:${min}:${sec}`;

  document.getElementById('clock-date').innerHTML = today;
  document.getElementById('clock-time').innerHTML = time;
};

const timer = document.getElementById('timer');

const count = {
  id : null,
  cnt : 15
}

function countDown(){
  let startDt = new Date();
  let endDt = new Date(startDt.getTime() + count.cnt * 1000);
  count.id = setInterval(function(){
  console.log("count down");
  const now = new Date();
    if (now.getTime() > endDt.getTime()){
      clearInterval(count.id);
      quizList.checkAns("TIME OVER");
      quizList.checkEnd();
    } else {
      timer.removeChild(timer.firstChild);
    }
  }, 1000);
}

function delCount(){
  while(timer.firstChild) {
    timer.removeChild(timer.firstChild);
  }
}

function addCount(num){
  let fragment = document.createDocumentFragment();
  let countNum = 100/num;
  for (let index = 0; index < num; index++) {
    let count = document.createElement('div');
    count.id = 'count';
    count.style.width = countNum+'%';
    fragment.appendChild(count);
  }
  timer.appendChild(fragment);
}

function sleep(waitSec){
  return new Promise(function(resolove){
    setTimeout(function(){
      resolove()}, waitSec);
  });
}