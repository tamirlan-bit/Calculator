console.log("JS works");

const display = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');

let lastPressed = '';
let storedValue = 0;
let appendFlag = false;

// Update the display
function updateDisplay(value) {
    display.textContent = value;
  }

// Numbers event listeners
numberBtns.forEach( number=> {
    number.addEventListener('click', () => {
        lastPressed = Number(number.textContent);
        storedValue += lastPressed;
        updateDisplay(storedValue);
        console.log(lastPressed);
    }
)});

// Operator event listeners
operatorBtns.forEach( operator => {
    operator.addEventListener('click', () => {
        display.append(operator.textContent);
        console.log(`Opertaor ${operator.textContent} was Pressed`);
    }
)});

// Equal event listeners
equalBtn.addEventListener('click', () => {
    console.log(`Equal is no joke`);
});

// Clear event listener
clearBtn.addEventListener('click', () => {
    updateDisplay('CLEARED');
    setTimeout(() => { updateDisplay(0); },700);
    console.log(`Time to cleanup display`);
});