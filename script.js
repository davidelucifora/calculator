const display = document.getElementById('calc-display');
const calcArray = []
const dotButton = document.querySelector('.dot-btn')
const buttons = document.querySelectorAll('.grid-btn');
let displayReset = true;
display.innerText = 0; 
let operator

buttons.forEach(btn => {
    btn.addEventListener('click', takeInput)
});

//Takes Input from buttons and updates the display
function takeInput(e){
const buttonPressed = e.target

switch ( true ){
    case buttonPressed.classList.contains('num-btn'):
        if (displayReset) {
            display.innerText = '';
            displayReset = false
        }

        display.innerText += buttonPressed.innerText
    break;

    case buttonPressed.classList.contains('dot-btn'):
            display.innerText += buttonPressed.innerText
            disableDotButton(dotButton)
    break;
    
    case buttonPressed.classList.contains('delete-btn'):
            display.innerText = '0'
            calcArray.length = 0
            displayReset = true;
            enableDotButton(dotButton)
    break;
    
    case buttonPressed.classList.contains('calc-btn'):   
        displayReset = true;

        if (!calcArray.length){
            operator = buttonPressed.innerText
            calcArray.push(parseFloat(display.innerText))
            enableDotButton(dotButton)
            displayReset === true;
        }
        else {
            operator === '' ? operator = buttonPressed.innerText : ''
            display.innerText = operate(operator)
            operator = buttonPressed.innerText
        }
    break;
    
    case buttonPressed.classList.contains('equal-btn'):
        if (display.innerText.includes('.')) disableDotButton(dotButton)    
        if (operator === ''){
            display.innerText += ''
        }
        else {
            calcArray.push(parseFloat(display.innerText))
            display.innerText = operate(operator)
            displayReset = true;
            operator = ''
        }
    break;

    case buttonPressed.classList.contains('negative-btn'):
        calcArray.push(parseFloat(display.innerText))
        operator = buttonPressed.innerText;
        display.innerText = operate(operator)
    break;
    }
}

// Operation Functions

//Main Operator
function operate(operator){
    let result 
    switch (operator) {
        case '+':
            result = sum(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            return result
            
        case '-':
            result = subtract(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            return result
            
        case 'x':
            result = multiply(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            return result
            
        case '÷':
            if (calcArray.includes(0)) {
                displayReset = true;
                return 'Noope!'}
            result = divide(calcArray)
            calcArray.length = 0
            calcArray.push(result)
            return result
            
        case '%':
            result = percentage(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            return result
             
        case '+/-':
            result = negative(calcArray);
            calcArray.length = 0
            calcArray.push(result)
            return result
            
    }

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
        dotButton.disable = true;
}
function enableDotButton(dotButton){

    dotButton.classList.remove('btn-disabled')
    dotButton.disable = false;
}

//Add Keyboard Support
document.addEventListener('keydown', keyInput)
function keyInput(e){
            document.querySelector(`[data-key="${e.key}-key"]`).click()
    }
