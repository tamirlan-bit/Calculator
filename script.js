const display = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');


let storedNum = '';
let mem = 0;
let lastOperation = '';
let equalFlag = false

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Numbers event listeners
numberBtns.forEach(number => {
    number.addEventListener('click', () => {
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);
        console.log("Numbers addListerner");           
        if ( equalFlag == true)    {
            mem = 0;
            equalFlag = false;
        }                          
        storedNum += number.textContent;
        updateDisplay(storedNum);
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);
    });
});

// Operator event listeners
operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);
        equalFlag = false;           
        lastOperation = operator.textContent;                
        if (lastOperation == '+') { 
            handleAdd(storedNum); 
        }
        if (lastOperation == '−') { 
            handleSub(storedNum); 
        } 
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);      
    });
});

// Handle addition
function handleAdd(value) {
    lastOperation = '+';
    const nValue = Number(value);
    mem = nValue + mem;
    updateDisplay(mem);
    storedNum = '';
}

// Handle subtraction
function handleSub(value) {
    lastOperation = '−';
    const nValue = Number(value);
    mem = nValue - mem;
    updateDisplay(mem);
    storedNum = '';
    console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);   
}

// Equal event listeners
equalBtn.addEventListener('click', () => {
    console.log("Equal addListerner");  
    equalFlag = true;  
    handleEqual();
});

function handleEqual() {
    console.log("=");
    let result = '';
    if (lastOperation == '+'){
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);      
        result = Number(mem) + Number(storedNum);
        updateDisplay(result);  
        mem = result;
    }
    else if (lastOperation == '−'){
        console.log("lastOperation ", lastOperation ,"storedNum: ",storedNum, " mem: ",mem, "EqualFlag", equalFlag);      
        result = Number(mem) - Number(storedNum);
        updateDisplay(result);  
    }
    storedNum = '';
}

// Clear event listener
clearBtn.addEventListener('click', () => {
    updateDisplay('CLEARED');
    storedNum = '';
    mem = 0;
    setTimeout(() => { updateDisplay(0); },700);
    console.log("Time to cleanup display");
});

