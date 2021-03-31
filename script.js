const NUMBERBUTTONS = document.querySelectorAll('[data-number]');
const OPERATORBUTTON = document.querySelectorAll('[data-operation]');
const EQUALBUTTON = document.querySelector('[data-equals]');
const DELETEBUTTON = document.querySelector('[data-delete]');
const CLEARBUTTON = document.querySelector('[data-all-clear]');
const PREVIOUS_INPUT = document.querySelector('[data-prev]');
const CURRENT_INPUT = document.querySelector('[data-current]');

class Calculator {
    constructor(PREVIOUS_INPUT,CURRENT_INPUT) {
        this.CURRENT_INPUT = CURRENT_INPUT,
        this.PREVIOUS_INPUT = PREVIOUS_INPUT
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        console.log(this.previousOperand);


    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    getDisplayNumber(num){
        const stringNumber = num.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else {
           integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0}) 
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }
    appendNumber(num){
        if(num === '.' && this.currentOperand.includes('.')) return
     this.currentOperand = this.currentOperand.toString() + num.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation) {
            case '+':
                computation = prev + curr;
                break;
                case '-':
                    computation = prev - curr;
                    break;
                    case '*':
                        computation = prev * curr;
                        break;
                        case '/':
                            computation = prev / curr;
                            break;
                            default:
                                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }
    updateDisplay(){
        this.CURRENT_INPUT.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
        this.PREVIOUS_INPUT.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        console.log(this.operand);
          
        } else {
            this.PREVIOUS_INPUT.innerText = ''
        }

    };
    
};

const CALCULATOR = new Calculator(PREVIOUS_INPUT, CURRENT_INPUT);
NUMBERBUTTONS.forEach(button => {
   button.addEventListener('click', () =>{
       CALCULATOR.appendNumber(button.innerText);
       CALCULATOR.updateDisplay();
   }) 
});
OPERATORBUTTON.forEach(button => {
    button.addEventListener('click', () =>{
        CALCULATOR.chooseOperation(button.innerText);
        CALCULATOR.updateDisplay();
    }) 
 });

EQUALBUTTON.addEventListener('click', () =>{
    CALCULATOR.compute();
    CALCULATOR.updateDisplay();
});
CLEARBUTTON.addEventListener('click', () =>{
    CALCULATOR.clear();
    CALCULATOR.updateDisplay();
});
DELETEBUTTON.addEventListener('click', () =>{
    CALCULATOR.delete();
    CALCULATOR.updateDisplay();
})