let totalOnDisplay = '';
let displayReset = true;
let operator = ''
let calcArray = []
let calculatorDisplay = document.getElementById('calc-display');
calculatorDisplay.innerText = 0;

let buttons = document.querySelectorAll('.grid-btn');
buttons.forEach(btn => {
    btn.addEventListener('click', takeInput)
})

//Takes Input from buttons
function takeInput(e){

    if(e.target.classList.contains('num-btn')){
        if (displayReset === true) {
                totalOnDisplay = '';
                displayReset = false
        }
        
        totalOnDisplay += e.target.innerHTML
        calculatorDisplay.innerHTML = totalOnDisplay
    }

    if (e.target.classList.contains('dot-btn'))
    {
        totalOnDisplay += e.target.innerHTML
        calculatorDisplay.innerHTML = totalOnDisplay
        e.target.disabled = true;
        e.target.classList.add('btn-disabled')
    }
    if(e.target.classList.contains('delete-btn')){
        totalOnDisplay = '0'
        calculatorDisplay.innerText = totalOnDisplay
        calcArray = []
        displayReset = true;
        document.querySelector('.dot-btn').disabled = false;
    }
    if(e.target.classList.contains('calc-btn')){
        displayReset = true;

        if (!calcArray.length){
            operator = e.target.innerHTML
            calcArray.push(parseFloat(calculatorDisplay.innerText))
            console.log('array was empty', calcArray,operator)
            document.querySelector('.dot-btn').disabled = false;
            displayReset === true;
        }
        else {
            operator === '' ? operator = e.target.innerHTML : ''
            calculatorDisplay.innerHTML = operate(operator)
            operator = e.target.innerHTML
        }
        console.log(calcArray)

}
    if (e.target.classList.contains('equal-btn')){
        if (operator === ''){
            calculatorDisplay.innerHTML += ''
        }
        else {
        calcArray.push(parseFloat(calculatorDisplay.innerText))
        calculatorDisplay.innerHTML = operate(operator)
        displayReset === true;
        operator = ''
        document.querySelector('.dot-btn').disabled = false;
    }
    }
    if (e.target.classList.contains('negative-btn')){
        calcArray.push(parseFloat(calculatorDisplay.innerText))
        operator = e.target.innerHTML;
        calculatorDisplay.innerHTML = operate(operator)
    }

    console.log(calcArray)
}

// Operation Functions

//Main Operator
function operate(operator){
    let result 
    switch (operator) {
        case '+':
            result = sum(calcArray);
            calcArray = []
            calcArray.push(result)
            return result
            break
        case '-':
            result = subtract(calcArray);
            calcArray = []
            calcArray.push(result)
            return result
            break
        case 'x':
            result = multiply(calcArray);
            calcArray = []
            calcArray.push(result)
            return result
            break
        case '÷':
            if (calcArray.some(num => num = 0)) return 'Noope!'
            result = divide(calcArray)
            calcArray = []
            calcArray.push(result)
            return result
            break
        case '%':
            result = percentage(calcArray);
            calcArray = []
            calcArray.push(result)
            return result
            break 
        case '+/-':
            result = negative(calcArray);
            calcArray = []
            calcArray.push(result)
            return result
            break 
    }

}

//Sub Operations
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
    return -Math.abs(calcArray[0])
}




/*
I hit +
Take the number from the display and add it to the array.
if it's the only number in the Array, do nothing, store the + as operator for the next
I type another number
I hit + again.
I check the array, there's something inside already...

I take the operator that was stored before, add this number to what is in the array with that operator
take the result and store it alone on the array.

store the new operator for the next operation
Rinse and repeat
*/