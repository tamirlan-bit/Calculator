const display = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const negBtn = document.querySelector('.neg');
const backBtn = document.querySelector('.backspace');
const dotBtn = document.querySelector('.dot');

clearValues();
let mem = 0;
let equalFlag = false

// Update the display
function updateDisplay(value) {
    if (typeof value === 'number') {
        // Format numbers to max 3 decimals, removing trailing zeros
        value = value.toFixed(3).replace(/\.?0+$/, '');
    }
    display.textContent = value;
}

// Numbers event listeners
numberBtns.forEach(number => {
    number.addEventListener('click', () => {
        if ( equalFlag == true)    {
            mem = 0;
            equalFlag = false;
        }                          
        lastNum += number.textContent;
        updateDisplay(lastNum);
    });
});

// Operator event listeners
operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        equalFlag = false;           
        lastOperation = operator.textContent;                
        if (lastOperation == '+') { 
            handleAdd(lastNum); 
        }
        else if (lastOperation == '−') { 
            handleSub(lastNum); 
        } 
        else if ( lastOperation == '×') {
            handleMulti(lastNum);
        }
        else if ( lastOperation == '÷') {
            handleDivide(lastNum);
        }
    });
});

// Handle addition
function handleAdd(value) {
    lastOperation = '+';
    let nValue = Number(value);
    opMem = '+';
    mem = nValue + mem;
    updateDisplay(mem);
    lastNum = '';
}

// Handle subtraction
function handleSub(value) {
    let nValue = Number(value);
    if ( opMem != '−' ){
        nValue = nValue * -1 ;
    }
    opMem = '−';
    mem = mem - nValue;
    updateDisplay(mem);
    lastNum = '';
}

// Handle multiplication
function handleMulti(value) {
    lastOperation = '×';
    // If there's no input yet, just wait
    if (lastNum === '') {
        opMem = '×';
        return;
    }
    let nValue = Number(value);
    // First time using multiply, initialize mem
    if (opMem === '' || equalFlag) {
        mem = nValue;
    } else {
        mem = mem * nValue;
    }
    opMem = '×';
    updateDisplay(mem);
    lastNum = '';
    equalFlag = false;
}

// Handle Divide
function handleDivide(value) {
    lastOperation = '÷';
    if ( opMem == ''  && lastNum !== '' && !equalFlag){
        mem = value;
        value = 1;
    }
    opMem = '÷';
    if ( value == ''){
        value = 1;
    }
    let nValue = Number(value);  
    if (nValue === 0) {
        updateDisplay("Error");
        clearValues();
        return;
    }     
    mem = mem / nValue;
    updateDisplay(mem);
    lastNum = '';    
}

// Equal event listeners
equalBtn.addEventListener('click', () => {
    equalFlag = true;  
    handleEqual();
});

function handleEqual() {
    let result = '';
    if (lastOperation == '+'){
        result = Number(mem) + Number(lastNum);
        updateDisplay(result);  
        mem = result;
    }
    else if (lastOperation == '−'){
        result = Number(mem) - Number(lastNum);
        updateDisplay(result);  
        mem = result;
    }
    else if (lastOperation == '×'){
        result = Number(mem) * Number(lastNum);
        updateDisplay(result);  
        mem = result;
    }
    else if (lastOperation == '÷'){
        result = Number(mem) / Number(lastNum);
        if ( Number(lastNum) === 0) {
            result = 'Error';
        }
        updateDisplay(result);  
        mem = result;
    }    
    clearValues();
}

//Back Space ⌫
backBtn.addEventListener('click', () => {
    lastNum = display.textContent;
    lastNum = lastNum.slice(0,-1);
    updateDisplay(lastNum);
});

//negative
negBtn.addEventListener('click', () => {
    lastNum = display.textContent;
    lastNum = -lastNum;
    updateDisplay(lastNum);
});

//dot
dotBtn.addEventListener('click', () => {
    lastNum = display.textContent;
    if (!lastNum.includes('.')) {
        if (lastNum === '') {
            lastNum = '0.';
        } else {
            lastNum += '.';
        }
        updateDisplay(lastNum);
    }
});

// Clear event listener
clearBtn.addEventListener('click', () => {
    updateDisplay('CLEARED');
    clearValues();
    mem = 0;
    equalFlag = false;
    setTimeout(() => { updateDisplay(0); },700);
});

function clearValues (){
    lastNum = '';    
    opMem = '';
    lastOperation = '';    
}


