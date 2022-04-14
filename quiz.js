// module
export {quizList};
import {count, countDown, addCount, delCount } from "./clock.js";
import { generateRandomArray } from "./random.js";

// DOM 
const question = document.getElementById('question');
const resChoices = document.getElementById('resChoices');
// const resultBtn = document.getElementById('quiz-result');




// button
const button = {
  addBtn : document.getElementById('add'),
  delBtn : document.getElementById('del'),
  reloadBtn : document.getElementById('reload'),
  startBtn : document.getElementById('start'),
  // resultBtn : document.getElementById('result'),
  choices : {},
  delButton : function(){
    while (resChoices.firstChild) {
      resChoices.removeChild(resChoices.firstChild);
    }
  },
  addResultBtn : function(){
    let resultBtn = document.createElement('button');
    resultBtn.innerText = '詳細を見る';
    resultBtn.id = 'resultTable'
    resChoices.appendChild(resultBtn);
    resultBtn.addEventListener('click', function(){
      quizResult.resultOnOff();
    });
  }
};

// quiz info
const quizList = {
  quiz : null,
  quizCount : 0,
  correctAns : 0,
  quizLen : 10,
  quizId : null,
  checkAns : function(res){
    quizResult.results = {"num" : quizList.quizCount, "question" : quizList.quiz.question, "choice" : res, "result" : '×'};
    if(this.quiz.ans === res){
      this.correctAns++;
      quizResult.results["result"] = '○';
    }
    quizResult.recoadResult(quizResult.results);
    console.log(quizResult.resultRecoad);
  },
  checkEnd : function(){
    if(this.quizCount === this.quizLen){
      delQuiz();
      question.innerHTML = "正解数は"+quizList.correctAns+"／"+quizList.quizLen+"個です．";
      alert('終了');
      button.addResultBtn();
      quizResult.makeResult();
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

// 結果を保存  | 問題No. | 問題 | 判定 |
const quizResult = {
  resultRecoad : [],
  results : {},
  recoadResult : function(recoad){
    this.resultRecoad.push(recoad);
  },
  makeResult : function (){
    let fragment = document.createDocumentFragment();
    const resultTable = document.createElement('div');
    resultTable.className = 'result';
    resultTable.id = 'closed';
    resChoices.appendChild(resultTable);
    this.resultRecoad.forEach(function(result){
      let r = document.createElement('div');
      // r.id = 'closed';
      r.innerText = 'Q.' + result.num+': ' + result.question + ': ' + result.choice + ' : ' + result.result;
      console.log(result);
      fragment.appendChild(r);
      console.log("foo");
    })
    resultTable.appendChild(fragment);
  },
   resultOnOff : function(){
    const resultClass = document.getElementsByClassName('result');
     if(resultClass[0].id === 'closed'){
        resultClass[0].id = 'opened';
        document.getElementById('resultTable').innerText = '詳細を閉じる'
      } else {
        resultClass[0].id = 'closed';
        document.getElementById('resultTable').innerText = '詳細を見る'
    }
  }
}


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

// resultBtn.addEventListener('click', function(){
//   if(document.getElementById('closed')){
//     document.getElementById('closed').id = 'opened';
//   } else {
//     document.getElementById('opened').id = 'closed';
//   }
// });

//やりたいことリスト
/*
- 制限時間を表示
- 最後に表で結果を表示
- 問題をランダムにする
- カテゴリ作成
*/