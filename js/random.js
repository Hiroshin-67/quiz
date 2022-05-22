export {makeRandomNum, generateRandomArray}
// lenまでの乱数を返す
function makeRandomNum(len){
  return Math.floor(Math.random()*len);
};

// 値の範囲がminNunからmaxNumで長さがgenerateLengthの重複しない配列を返す
function generateRandomArray(minNum, maxNum, generateLength){
  let numArray = [];
  let randomArray = [];
  let generatedRandomArray = [];
  for (let index = minNum; index <= maxNum; index++) {
    numArray.push(index);
  }
  for (let j = 0, len = numArray.length; j < numArray.length; j++,len--) {
    let randomNumber = makeRandomNum(len);
    randomArray.push(numArray[randomNumber]);
    numArray[randomNumber] = numArray[len-1];
  }
  for (let i = 0; i < generateLength; i++) {
    generatedRandomArray.push(randomArray[i]);
    console.log(randomArray[i]);
  }
  return generatedRandomArray;
};
