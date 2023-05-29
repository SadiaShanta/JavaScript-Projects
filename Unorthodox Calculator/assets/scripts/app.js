const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];
//get user input from input field
function getUserNumberInput(){
   return parseInt(userInput.value);
   // convert user input(string) into integer
}
//Generates and writes calculation log
function showOutput(operator, initialNum, enteredNum){
   const calcDescription = `${initialNum} ${operator} ${enteredNum}`;
   outputResult(currentResult, calcDescription)  //from vendor.js
}

function writeToLog(
   operationIdentifier,
   prevResult,
   operationNumber,
   newResult
){
   const logEntry = {
      operation: operationIdentifier,
      prevResult: prevResult,
      newNumber: operationNumber,
      result: newResult
   }
   logEntries.push(logEntry);
   console.log(logEntry.operation);
   console.log(logEntries);
}

function calculateResult(operationType){
   if(operationType!== 'ADD' &&
      operationType!== 'SUBTRACT' &&
      operationType!== 'MULTIPLY' &&
      operationType!== 'IVIDE' ||
      !enteredNumber)
      {
         return;
      }
   const enteredNumber = getUserNumberInput();
   const initialResult = currentResult;
   let methodOperator;
   if(operationType=== 'ADD'){
      currentResult += enteredNumber;
      methodOperator = '+'
   }
   else if(operationType=== 'SUBTRACT'){
      currentResult -= enteredNumber;
      methodOperator = '-'
   }
   else if(operationType=== 'MULTIPLY'){
      currentResult *= enteredNumber;
      methodOperator = '*'
   }
   else if(operationType=== 'DIVIDE'){
      currentResult /= enteredNumber;
      methodOperator = '/'
   }
   
   showOutput(methodOperator, initialResult, enteredNumber);
   wrtiteToLog(operationType, initialResult, enteredNumber, currentResult);
}
function add(){
   calculateResult('ADD')
}
addBtn.addEventListener('click', add);

function subtract(){
   calculateResult('SUBTRACT')
}
subtractBtn.addEventListener('click', subtract);

function multiply(){
   calculateResult('MULTIPLY')
}
multiplyBtn.addEventListener('click', multiply);

function divide(){
   calculateResult('DIVIDE')
}
divideBtn.addEventListener('click', divide);