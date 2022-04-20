// module
export {quizList};
import {count, countDown, addCount, delCount, sleep} from "./clock.js";
import { generateRandomArray } from "./random.js";

// DOM 
const question = document.getElementById('question');
const resChoices = document.getElementById('resChoices');
const questionNum = document.getElementById('question-num');
const questionMain = document.getElementById('question-main');



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
    let correct = 0;
    quizResult.results = {"num" : quizList.quizCount, "question" : quizList.quiz.question, "choice" : res, "result" : '×'};
    if(this.quiz.ans === res){
      this.correctAns++;
      quizResult.results["result"] = '○';
      correct = 1;
    }
    maruBatsu(correct);
    quizResult.recoadResult(quizResult.results);
    console.log(quizResult.resultRecoad);
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
      button.addResultBtn();
      quizResult.makeResult2();
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
      let r = document.createElement('p');
      // r.id = 'closed';
      r.innerText = 'Q.' + result.num+': ' + result.question + ': ' + result.choice + ' : ' + result.result;
      fragment.appendChild(r);
    })
    resultTable.appendChild(fragment);
  },
  makeResult2 : function(){
    const resultTableHtml = document.getElementById("result-table");
    const resultTable = document.createElement("table");
    resultTable.className = "result";
    resultTable.id = "closed";
    resultTableHtml.appendChild(resultTable);
    // const resultTableHead = document.createElement("th");
    // resultTable.appendChild(resultTableHead);
    const headRow = document.createElement("tr");
    headRow.id = 'headrow';
    resultTable.appendChild(headRow);
    const Qnum = document.createElement("th");
    Qnum.id = "numHead";
    Qnum.innerText = "番号";
    headRow.appendChild(Qnum);
    const Qmain = document.createElement("th");
    Qmain.id= "mainHead";
    Qmain.innerText = "問題";
    headRow.appendChild(Qmain);
    const Qselect = document.createElement("th");
    Qselect.id = "selectHead";
    Qselect.innerText = "解答";
    headRow.appendChild(Qselect);
    const Qans = document.createElement("th");
    Qans.id = "ansHead";
    Qans.innerText = "結果";
    headRow.appendChild(Qans);
    this.resultRecoad.forEach(function(result){
      const row = document.createElement("tr");
      const num = document.createElement("td")
      num.innerText = result.num;
      const question = document.createElement("td")
      question.innerText = result.question;
      const choice = document.createElement("td")
      choice.innerText = result.choice;
      const yourResult = document.createElement("td")
      yourResult.innerText = result.result;
      resultTable.appendChild(row);
      row.appendChild(num);
      row.appendChild(question);
      row.appendChild(choice);
      row.appendChild(yourResult);
    })


  },
  resultOnOff : function(){
    const resultClass = document.getElementsByClassName('result');
     if(resultClass[0].id === 'closed'){
        resultClass[0].id = 'opened';
        document.getElementById('resultTable').innerText = '詳細を閉じる'
        window.scrollTo({
          top : document.getElementById('headrow').getBoundingClientRect().top,
          behavior : 'smooth',
        });
      } else {
        resultClass[0].id = 'closed';
        document.getElementById('resultTable').innerText = '詳細を見る'
        window.scrollTo({
          top : resChoices.getBoundingClientRect().top,
          behavior : 'smooth',
        });
      }
  }
}


// quiz main
async function quiz(){
  await getQuizes();
  await sleep(500);
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
  questionNum.innerText = "Q."+quizList.quizCount+": ";
  questionMain.innerText= quizList.quiz.question;
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
  questionNum.innerText = ""
  questionMain.innerText = "";
  delCount();
};

async function maruBatsu(res){
  if(res === 1){
    document.getElementsByClassName('circle')[0].id = 'open';
    await sleep(500);
    document.getElementsByClassName('circle')[0].id = 'closed';
    // await sleep(1000);
  } else {
    document.getElementsByClassName('cross')[0].id = 'open';
    await sleep(500);
    document.getElementsByClassName('cross')[0].id = 'closed';
    // await sleep(1000);
  }
}

// event
button.startBtn.addEventListener('click', quiz);


//やりたいことリスト
/*
- 制限時間を表示
- 最後に表で結果を表示
- 問題をランダムにする
- まるバツ表示
- カテゴリ作成
*/