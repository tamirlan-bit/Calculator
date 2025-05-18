// Get the display element and all buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentNumber = '';
let storedNumber = 0;
let currentOperator = null;
let isWaitingForNextNumber = false;

// Handle number and decimal button presses
function handleNumberButton(value) {
  if (isWaitingForNextNumber) {
    currentNumber = value;
    isWaitingForNextNumber = false;
  } else {
    currentNumber += value;
  }
  updateDisplay(currentNumber);
}

// Handle operator buttons (+, −, ×, ÷)
function handleOperatorButton(operator) {
  if (currentNumber !== '') {
    // If there's a pending operation, complete it first
    if (currentOperator !== null) {
      calculate();
    } else {
      storedNumber = parseFloat(currentNumber);
    }
    currentOperator = operator;
    isWaitingForNextNumber = true;
  }
}

// Handle the "=" button
function handleEqualButton() {
  if (currentOperator !== null) {
    calculate();
    currentOperator = null;  // Clear the operator for fresh start
    isWaitingForNextNumber = true;
  }
}

// Perform the actual math
function calculate() {
  const currentValue = parseFloat(currentNumber);
  switch (currentOperator) {
    case '+':
      storedNumber += currentValue;
      break;
    case '−':
      storedNumber -= currentValue;
      break;
    case '×':
      storedNumber *= currentValue;
      break;
    case '÷':
      storedNumber /= currentValue;
      break;
  }
  currentNumber = storedNumber.toString();
  updateDisplay(currentNumber);
}

// Handle the "AC" button
function handleClearButton() {
  currentNumber = '';
  storedNumber = 0;
  currentOperator = null;
  isWaitingForNextNumber = false;
  updateDisplay('0');
}

// Update the calculator display
function updateDisplay(value) {
  display.textContent = value;
}

// Attach event listeners to each button
buttons.forEach(button => {
  const buttonText = button.textContent;

  if (button.classList.contains('operator')) {
    button.addEventListener('click', () => handleOperatorButton(buttonText));
  } else if (button.classList.contains('equal')) {
    button.addEventListener('click', handleEqualButton);
  } else if (button.classList.contains('clear')) {
    button.addEventListener('click', handleClearButton);
  } else {
    button.addEventListener('click', () => handleNumberButton(buttonText));
  }
});