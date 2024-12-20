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




const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;


calculateBtn.addEventListener('click', (): void => {



  console.log(firstNumber.getFraction().toFraction(true));
  console.log(secondNumber.getFraction().toFraction(true));






});
