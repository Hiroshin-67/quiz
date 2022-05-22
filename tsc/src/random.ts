export function makeRandomNum(maxNum:number):number{
  return Math.floor(Math.random()*maxNum);
}

export function makeRandomNumArray(minNum:number,maxNum:number, generateLen:number):Array<number>{
  let numArray:Array<number> = [];
  let randomArray:Array<number> =[];
  let generatedRandomArray:Array<number> = [];
  for(let i = minNum; i <= maxNum; i++){
    numArray.push(i);
  }
  for(let j = 0, len=numArray.length; j < numArray.length; j++,len--){
    let randomNumber:number = makeRandomNum(len);
    randomArray.push(numArray[randomNumber]);
    numArray[randomNumber] = numArray[len-1];
  }
  for(let index = 0; index < generateLen; index++){
    generatedRandomArray.push(randomArray[index]);
  }
  return generatedRandomArray;
}
