const display = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');


let lastPressed = 0;
let storedNum = '';
let addingSum = 0;
let lastOperation = '';

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Numbers event listeners
numberBtns.forEach(number => {
    number.addEventListener('click', () => {  
        if ( lastOperation == "=")    {
            addingSum = 0;
        }                          
        storedNum += number.textContent;
        updateDisplay(storedNum);
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " addingSum: ",addingSum);
    });
});

// Operator event listeners
operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " addingSum: ",addingSum);
        // If there is no stored number, use the current display as the stored number
        if (storedNum !== '') {
            handleAdd(storedNum);
        }
        lastOperation = operator.textContent;        
    });
});

// Handle addition
function handleAdd(value) {
    lastOperation = '+';
    const nValue = Number(value);
    addingSum = nValue + addingSum;
    updateDisplay(addingSum);
    storedNum = '';
    console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " addingSum: ",addingSum);
}

// Equal event listeners
equalBtn.addEventListener('click', () => {
    handleEqual();
});

function handleEqual() {
    let result = '';
    if (lastOperation == '+'){
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " addingSum: ",addingSum);
        result = Number(addingSum) + Number(storedNum);
        updateDisplay(result);  
    }
    storedNum = '';
   // addingSum = 0;
}

// Clear event listener
clearBtn.addEventListener('click', () => {
    updateDisplay('CLEARED');
    storedNum = '';
    lastPressed = 0;
    addingSum = 0;
    setTimeout(() => { updateDisplay(0); },700);
    console.log("Time to cleanup display");
});

