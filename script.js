const display = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');


let lastNum = '';
let mem = 0;
let lastOperation = '';
let opMem = '';
let equalFlag = false

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Numbers event listeners
numberBtns.forEach(number => {
    number.addEventListener('click', () => {
        console.log("lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);
        if ( equalFlag == true)    {
            mem = 0;
            equalFlag = false;
        }                          
        lastNum += number.textContent;
        updateDisplay(lastNum);
        console.log("lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);
    });
});

// Operator event listeners
operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        console.log("lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);
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
            console.log("op listen, lastOp=÷");
            handleDivide(lastNum);
        }
        console.log("Op Listner: lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);      
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
    if ( opMem == '' ){
        mem = 1;
    }
    opMem = '×';
    if ( value == ''){
        value = 1;
    }
    let nValue = Number(value);
    mem = nValue * mem;
    updateDisplay(mem);
    lastNum = '';    
}

// Handle Divide
function handleDivide(value) {
    lastOperation = '÷';
    console.log("Divide: lastOperation ", lastOperation , "opMem" ,opMem, "value: ",value, " mem: ",mem);
    if ( opMem == '' ){
        mem = value;
        value = 1;
    }
    opMem = '÷';
    if ( value == ''){
        value = 1;
    }
    let nValue = Number(value);
    console.log("opMem" ,opMem, "nvalue: ",nValue, " mem: ",mem);      
    mem = mem / nValue;
    updateDisplay(mem);
    console.log("mem: ",mem);
    lastNum = '';    
}

// Equal event listeners
equalBtn.addEventListener('click', () => {
    equalFlag = true;  
    handleEqual();
});

function handleEqual() {
    console.log("=");
    let result = '';
    if (lastOperation == '+'){
        result = Number(mem) + Number(lastNum);
        updateDisplay(result);  
        mem = result;
        console.log("Handle add: lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);      
    }
    else if (lastOperation == '−'){
        result = Number(mem) - Number(lastNum);
        updateDisplay(result);  
        mem = result;
        console.log("Handle sub: lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);      

    }
    else if (lastOperation == '×'){
        result = Number(mem) * Number(lastNum);
        updateDisplay(result);  
        mem = result;
        console.log("Handle Multi: lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);      
    }
    else if (lastOperation == '÷'){
        result = Number(mem) / Number(lastNum);
        updateDisplay(result);  
        mem = result;
        console.log("Handle Multi: lastOperation ", lastOperation , "opMem" ,opMem, "lastNum: ",lastNum, " mem: ",mem);      
    }    
    lastNum = '';
    lastOperation = '';
    opMem = '';
}

// Clear event listener
clearBtn.addEventListener('click', () => {
    updateDisplay('CLEARED');
    lastNum = '';
    mem = 0;
    opMem = '';
    lastOperation = '';
    equalFlag = false;
    setTimeout(() => { updateDisplay(0); },700);
    console.log("Time to cleanup display");
});

