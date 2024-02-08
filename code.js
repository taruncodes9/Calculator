document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const clearButton = document.getElementById('clearButton');
  const equalsButton = document.getElementById('equalsButton');
  const decimalButton = document.getElementById('decimalButton');
  const operatorButtons = document.querySelectorAll('.operator');
  const numberButtons = document.querySelectorAll('.number');

  let currentInput = '';
  let currentOperator = '';
  let previousInput = '';
  let result = null;

  function updateDisplay(value) {
    display.value = value;
  }

  function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    result = null;
    updateDisplay('');
  }

  function appendToInput(value) {
    currentInput += value;
    updateDisplay(currentInput);
  }

  function calculate() {
    const input1 = parseFloat(previousInput);
    const input2 = parseFloat(currentInput);

    switch (currentOperator) {
      case '+':
        result = input1 + input2;
        break;
      case '-':
        result = input1 - input2;
        break;
      case '*':
        result = input1 * input2;
        break;
      case '/':
        result = input1 / input2;
        break;
      case '%':
        result = input1 % input2;
        break;
      default:
        result = null;
        break;
    }

    updateDisplay(result);
    previousInput = result.toString();
    currentInput = '';
  }

  clearButton.addEventListener('click', clearDisplay);

  operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentInput !== '' && previousInput !== '') {
        calculate();
      }
      currentOperator = this.getAttribute('data-operator');
      previousInput = currentInput;
      currentInput = '';
    });
  });

  equalsButton.addEventListener('click', calculate);

  decimalButton.addEventListener('click', function() {
    if (!currentInput.includes('.')) {
      appendToInput('.');
    }
  });

  numberButtons.forEach(button => {
    button.addEventListener('click', function() {
      appendToInput(this.getAttribute('data-number'));
    });
  });
});
