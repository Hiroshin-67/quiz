// DOM 
const question = document.getElementById('question');
const resChoices = document.getElementById('resChoices');

const button = {
  addBtn : document.getElementById('add'),
  delBtn : document.getElementById('del'),
  reloadBtn : document.getElementById('reload'),
  startBtn : document.getElementById('start'),
  // endBtn : document.getElementById('end'),
  choices : {},
  addEvent : function (){
    Object.keys(this.choices).forEach(function (key) {
      let select = document.getElementById(key);
      document.getElementById(key).addEventListener('click', function(){
        delQuiz();
        quizList.checkAns(select.value);
        quizList.checkEnd();
        judgeQuize();
      })
    });
  },
  delButton : function(){
    while (resChoices.firstChild) {
      resChoices.removeChild(resChoices.firstChild);
    }
  },
}

const quizList = {
  quiz : null,
  quizCount : 0,
  correctAns : 0,
  quizLen : null,
  checkAns : function(res){
    if(this.quiz.ans === res){
      this.correctAns++;
    }
  },
  checkEnd : function(){
    if(this.quizCount === this.quizLen){
      question.innerHTML = "正解数は"+quizList.correctAns+"／"+quizList.quizLen+"個です．";
      alert('終了');
      const endBtn = document.createElement("button");
      endBtn.innerText = "go top";
      resChoices.appendChild(endBtn);
      endBtn.id = 'end';
      endBtn.addEventListener('click', function(){
        window.location.reload();
      })
    }
  },
}

function startQuiz(){
  button.delButton();
  makeQuiz();
}

function delQuiz() {
  Object.keys(button.choices).forEach(function (key) {
    delete button.choices[key];
  });
  while (resChoices.firstChild) {
    resChoices.removeChild(resChoices.firstChild);
  }
  question.innerHTML = " "
}

function checkError(fn){
  try{
    fn();
  }catch(error){
    console.log(error.name);
    console.log(error.message);
  }
}

async function getQuizes() {
    const res = await fetch("https://hiroshin67.com/api/quizApi.php");
    const quizes = await res.json();
    quizList.quiz = quizes[quizList.quizCount];
    quizList.quizCount++;
    quizList.quizLen = quizes.length;
};

function makeQuiz(){
  //問題文を変更
  question.innerHTML = "Q."+quizList.quizCount+" : "+quizList.quiz.question;
  // 選択肢を画面に追加する
  Object.keys(quizList.quiz.choices).forEach(function(key){
    const  choiceList = document.createElement("button");
    choiceList.innerText = quizList.quiz.choices[key];
    resChoices.appendChild(choiceList);
    choiceList.id = key;
    choiceList.value = quizList.quiz.choices[key];
    button.choices[key] = choiceList.value;
  });
  button.addEvent();
}

async function judgeQuize(){
  await getQuizes();
  makeQuiz();
}

// イベント
window.addEventListener('load', getQuizes);
// button.addBtn.addEventListener('click', makeQuiz);
// button.delBtn.addEventListener('click', delQuiz);
// button.reloadBtn.addEventListener('click', function(){
//   window.location.reload();
// });
button.startBtn.addEventListener('click', startQuiz);


//やりたいことリスト
/*
1. タイム制限を表示
2. 問題をランダムにする
3. カテゴリ作成
*/