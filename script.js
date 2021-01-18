//Variables

const display = document.getElementById('calc-display');
let displayReset = true;
display.innerText = '0'; 
const calcArray = []
const dotButton = document.querySelector('.dot-btn')
const buttons = document.querySelectorAll('.grid-btn');
let operator = ''
let easterEgg = document.createElement('img')
easterEgg.setAttribute('src', 'marvinImg.png')
let eggDiv = document.createElement('div')
eggDiv.id = 'easterEgg'
eggDiv.style.display = 'none';
eggDiv.style.width = '500px';
eggDiv.style.height = '500px';
let contentDiv = document.getElementById('main-content')
contentDiv.appendChild(eggDiv)
eggDiv.appendChild(easterEgg)

//Listen for Click on Buttons
buttons.forEach(btn => btn.addEventListener('click', takeInput));


//Add Keyboard Support
document.addEventListener('keydown', keyInput)

function keyInput(e){
    if (e.key === '/') e.preventDefault()
    if (e.key === 'Backspace' && display.innerText != '0') {
        if (display.innerText.length == 1) {
            display.innerText = 0
            displayReset = true;}
        else{
            display.innerText = display.innerText.toString()
                .substring(0, display.innerText.length-1)
    }   
    }
    
            document.querySelector(`[data-key="${e.key}-key"]`).click()
    }

//Takes Input from buttons and updates the display
function takeInput(e){   

const buttonPressed = e.target;
let activeClass;

switch ( true ){

    case buttonPressed.classList.contains('num-btn'):
        activeClass = 'num-active'
        if (displayReset) {
                display.innerText = '';
                displayReset = false
        }

        display.innerText += buttonPressed.innerText
        
    break;

    case buttonPressed.classList.contains('dot-btn'):
        activeClass = 'num-active'
            display.innerText += buttonPressed.innerText
            disableDotButton(dotButton)
    break;
    
    case buttonPressed.classList.contains('delete-btn'):
        activeClass = 'delete-active'
            display.innerText = '0'
            calcArray.length = 0
            displayReset = true;
            enableDotButton(dotButton)
    break;
    
    case buttonPressed.classList.contains('calc-btn'):
        
        activeClass = 'calc-active';
        displayReset = true;
        enableDotButton(dotButton);

        if (operator === '') operator = buttonPressed.innerText
 
        
            calcArray.push(parseFloat(display.innerText));
            display.innerText = operate(operator)
            operator = buttonPressed.innerText
        
            
    break;
    
    case buttonPressed.classList.contains('equal-btn'):
        activeClass = 'equal-active'
        if (display.innerText.includes('.')) disableDotButton(dotButton)    
        if (operator === ''){
            display.innerText += ''
        }
        else {
            calcArray.push(parseFloat(display.innerText))
            display.innerText = operate(operator)
            displayReset = true;
            operator = ''
            calcArray.length = 0;
        }
    break;

    case buttonPressed.classList.contains('negative-btn'):
        activeClass = 'calc-active'
        calcArray.push(parseFloat(display.innerText))
        operator = buttonPressed.innerText;
        display.innerText = operate(operator)
    break;
    }

    keyPressStyle(buttonPressed, activeClass)
}

// Operation Functions

//Main Operator
function operate(operator){

    let result = 0
    switch (operator) {
        case '+':
            result = sum(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            break;
        case '-':
            result = subtract(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            break;
        case 'x':
            result = multiply(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            break;
        case '÷':
            if (calcArray.includes(0)) {
                displayReset = true;
                return 'Noope!'}
            
            result = divide(calcArray)
            calcArray.length = 0
            calcArray.push(result)
            break;
        case '%':
            result = percentage(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            break;
        case '+/-':
            result = negative(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            break;
    }

    if (result % 1 != 0) result = result.toFixed(2);
    if (result === 42) {
        eggDiv.style.display = 'flex'
        setTimeout(function(){
            eggDiv.style.display = 'none';
        },300)
    }
            
    return result;

}

//Arithmetic Operations
function sum(calcArray){
    return  calcArray.reduce((a,b) => a + b,)
}
function subtract(calcArray){
    return calcArray.reduce((a,b) => a - b);
}
function multiply(calcArray){
    return calcArray.reduce((a,b) => a * b);
}
function divide(calcArray){
    return calcArray.reduce((a,b) => a / b);
}
function percentage(calcArray){
    return calcArray.reduce((a,b) => (a * b) / 100);
}
function negative(calcArray){
    return -Math.abs(display.innerText)
}

// Disable/Enable Dot button
function disableDotButton(dotButton){

        dotButton.classList.add('btn-disabled')
        dotButton.disabled = true;
}
function enableDotButton(dotButton){

    dotButton.classList.remove('btn-disabled')
    dotButton.disabled = false;
}

function keyPressStyle(buttonPressed, activeClass){
buttonPressed.classList.add(activeClass)
setTimeout(function(){
    buttonPressed.classList.remove(activeClass)
}, 120);
}
