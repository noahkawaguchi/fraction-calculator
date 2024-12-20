import Fraction from "fraction.js";

import { NumberInput } from "./components/NumberInput";

const firstNumber = new NumberInput(
  document.getElementById('first-kind') as HTMLSelectElement,
  document.getElementById('first-integer') as HTMLInputElement,
  document.getElementById('first-numerator') as HTMLInputElement,
  document.getElementById('first-denominator') as HTMLInputElement,
);

const secondNumber = new NumberInput(
  document.getElementById('second-kind') as HTMLSelectElement,
  document.getElementById('second-integer') as HTMLInputElement,
  document.getElementById('second-numerator') as HTMLInputElement,
  document.getElementById('second-denominator') as HTMLInputElement,
);




const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;


calculateBtn.addEventListener('click', (): void => {



  console.log(firstNumber.getFraction().toFraction(true));
  console.log(secondNumber.getFraction().toFraction(true));






});
