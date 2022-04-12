// module
export {quizList};
import {count, countDown, addCount, delCount } from "./clock.js";
import { generateRandomArray } from "./random.js";

// DOM 
const question = document.getElementById('question');
const resChoices = document.getElementById('resChoices');

// button
const button = {
  addBtn : document.getElementById('add'),
  delBtn : document.getElementById('del'),
  reloadBtn : document.getElementById('reload'),
  startBtn : document.getElementById('start'),
  // endBtn : document.getElementById('end'),
  choices : {},
  delButton : function(){
    while (resChoices.firstChild) {
      resChoices.removeChild(resChoices.firstChild);
    }
  },
};

// quiz info
const quizList = {
  quiz : null,
  quizCount : 0,
  correctAns : 0,
  quizLen : 10,
  quizId : null,
  checkAns : function(res){
    if(this.quiz.ans === res){
      this.correctAns++;
    }
  },
  checkEnd : function(){
    if(this.quizCount === this.quizLen){
      delQuiz();
      question.innerHTML = "正解数は"+quizList.correctAns+"／"+quizList.quizLen+"個です．";
      alert('終了');
      const endBtn = document.createElement("button");
      endBtn.innerText = "BACK TO TOP";
      resChoices.appendChild(endBtn);
      endBtn.id = 'end';
      endBtn.addEventListener('click', function(){
        window.location.reload();
      });
    }else{
      quiz();
    }
  },
};

// quiz main
async function quiz(){
  await getQuizes();
  makeQuiz();
  countDown();
};

async function getQuizes() {
  const res = await fetch("https://hiroshin67.com/api/quizApi.php");
  const quizes = await res.json();
  if(quizList.quizId === null){
    quizList.quizId = generateRandomArray(0, quizes.length-1, 10);
  }
  quizList.quiz = quizes[quizList.quizId[quizList.quizCount]];
  quizList.quizCount++;
  // quizList.quizLen = quizes.length;
};

function makeQuiz(){
  delQuiz();
  //問題文を変更
  question.innerHTML = "Q."+quizList.quizCount+" : "+quizList.quiz.question;
  // 選択肢を画面に追加する
  Object.keys(quizList.quiz.choices).forEach(function(key){
    if(quizList.quiz.choices[key]){
      const  choiceList = document.createElement("button");
      choiceList.innerText = quizList.quiz.choices[key];
      resChoices.appendChild(choiceList);
      choiceList.id = key;
      choiceList.value = quizList.quiz.choices[key];
      button.choices[key] = choiceList.value;
    }
  });
  // delCount();
  addCount(count.cnt);
  // button.addEvent();
  addEventBtn();
};

function addEventBtn (){
  Object.keys(button.choices).forEach(function(key){
    let select = document.getElementById(key);
    select.addEventListener('click', function(){
      // countDownを終了
      clearInterval(count.id);
      // 答え合わせ
      quizList.checkAns(select.value);
      quizList.checkEnd();
    })
  })
};

function delQuiz() {
  Object.keys(button.choices).forEach(function (key) {
    delete button.choices[key];
  });
  while (resChoices.firstChild) {
    resChoices.removeChild(resChoices.firstChild);
  }
  question.innerHTML = " ";
  delCount();
};

// event
button.startBtn.addEventListener('click', quiz);


//やりたいことリスト
/*
- 制限時間を表示
- 最後に表で結果を表示
- 問題をランダムにする
- カテゴリ作成
*/