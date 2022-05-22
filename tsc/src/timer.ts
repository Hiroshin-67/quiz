export class Timer {
  timerId: number | undefined;
  thinkingTime: number;
  timer:HTMLElement | null;

  constructor(time:number){
    this.thinkingTime = time;
    this.timer = document.getElementById('timer');
  }

  setThinkingTime(time:number):Date{
    const startDt = new Date();
    return new Date(startDt.getTime() + time * 1000);
  }

  countDown():void{
    //  カウントダウン　　
    const endDt:Date = this.setThinkingTime(this.thinkingTime);
    this.timerId = window.setInterval(()=>{
      const now:Date = new Date();
      if(now.getTime() < endDt.getTime()){
        // カウンターを減らす
        console.log("count down");
        this.removeCounter();
      }else{
        clearInterval(this.timerId);
        // 次の問題へ
        console.log("next question");
      }
    },1000);
  }

  setCounter(time:number):void{
    // カウンターを最初の状態にする
    let fragment:DocumentFragment = new DocumentFragment();
    let countNumber:number = 100/time;
    for(let i= 0; i<time; i++){
      let counter:HTMLElement = document.createElement('div');
      counter.id='count';
      counter.style.width = countNumber+'%';
      fragment.appendChild(counter);
    }
    this.timer?.appendChild(fragment);
  }
  
  removeCounter():void{
    // カウンターを１つ取り除く
    this.timer?.firstChild?.remove();
  }
}