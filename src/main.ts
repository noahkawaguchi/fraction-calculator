import Fraction from "fraction.js";

import { NumberInput } from "./components/NumberInput";

const firstNumber = new NumberInput(
  document.getElementById('first-negative') as HTMLParagraphElement,
  document.getElementById('first-integer') as HTMLInputElement,
  document.getElementById('first-numerator') as HTMLInputElement,
  document.getElementById('first-denominator') as HTMLInputElement,
  document.getElementById('first-sign') as HTMLSelectElement,
  document.getElementById('first-kind') as HTMLSelectElement,
);

const secondNumber = new NumberInput(
  document.getElementById('second-negative') as HTMLParagraphElement,
  document.getElementById('second-integer') as HTMLInputElement,
  document.getElementById('second-numerator') as HTMLInputElement,
  document.getElementById('second-denominator') as HTMLInputElement,
  document.getElementById('second-sign') as HTMLSelectElement,
  document.getElementById('second-kind') as HTMLSelectElement,
);


const operation = document.getElementById('operation') as HTMLSelectElement;
const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
const result = document.getElementById('result') as HTMLParagraphElement;


calculateBtn.addEventListener('click', (): void => {



  const firstFrac: Fraction = firstNumber.getFraction();
  const secondFrac: Fraction = secondNumber.getFraction();

  switch (operation.value) {
    case '+':
      result.textContent = firstFrac.add(secondFrac).toFraction(true);
      break;
    case '-':
      result.textContent = firstFrac.sub(secondFrac).toFraction(true);
      break;
    case '✕':
      result.textContent = firstFrac.mul(secondFrac).toFraction(true);
      break;
    case '÷':
      result.textContent = firstFrac.div(secondFrac).toFraction(true);
      break;
    default:
      break;
  }


});
