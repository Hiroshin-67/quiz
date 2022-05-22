import {makeRandomNumArray} from "./random"
import {Timer} from "./timer"
// DOM 
const question = document.getElementById('question');
const resChoices = document.getElementById('resChoices');
const questionNum = document.getElementById('question-num');
const questionMain = document.getElementById('question-main');

// クイズ取得
export async function getQuiz(url:string):Promise<QuizData>{
  const res:Response = await fetch(url);
  // const quiz:Promise<Quiz> = await res.json();
  const resQuiz:QuizData = await res.json();
  return resQuiz;
}

interface QuizData{
  "id": number;
  "question": string;
  "choices": Choices;
  "ans": string;
}

interface Choices{
  [name:string] : string;
}


export class Quiz {
  quiz:QuizData;
  quizCnt: number;
  quizLen: number;
  quizNumArray: Array<number>;
  isAnswer: boolean;

  constructor(quiz:QuizData, quizLen:number){
    this.quiz = quiz;
    this.quizCnt = 0;
    this.quizLen = quizLen;
    this.quizNumArray = makeRandomNumArray(1, 11, this.quizLen);
    // this.quizUrl = url;
    this.isAnswer = false;
  }

  // クイズ問題文を作る
  makeQuestion(quiz:QuizData):void{
  questionNum!.innerText = "Q." + this.quizCnt;
  questionMain!.innerText = quiz.question;
 }

  // 選択肢を作成する
  makeChoices(quiz:QuizData):void{
   Object.keys(quiz.choices).forEach((key)=>{
    const choiceList:HTMLButtonElement = document.createElement("button");
    choiceList.innerText = quiz.choices[key];
    resChoices!.appendChild(choiceList);
    choiceList.id = key;
    choiceList.value = quiz.choices[key];
    choiceList.addEventListener("click", ()=>{
      this.isAnswer = true;
    })
   });
  }

 displayQuiz(){
   this.makeQuestion(this.quiz);
   this.makeChoices(this.quiz);
 }
//  まるバツ表示
 async displayMaruBatsu(){
   
 }

}