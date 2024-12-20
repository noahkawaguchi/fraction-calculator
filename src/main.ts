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

  // // Avoid division by 0
  // if (firstDenominatorInput.value === '0') {
  //   alert('Denominator cannot be 0');
  //   return;
  // }

  // // Get numeric values for the first number or use default values if blank
  // const firstInteger: number = firstIntegerInput.value 
  //                                ? parseInt(firstIntegerInput.value) 
  //                                : 0;
  // const firstNumerator: number = firstNumeratorInput.value 
  //                                  ? parseInt(firstNumeratorInput.value) 
  //                                  : 0;
  // const firstDenominator: number = firstDenominatorInput.value 
  //                                  ? parseInt(firstDenominatorInput.value) 
  //                                  : 1;

  // // Convert user's values to a Fraction object
  // const firstNumber: Fraction = new Fraction(
  //   (firstInteger * firstDenominator + firstNumerator), 
  //   firstDenominator,
  // );

  // console.log(firstNumber.toFraction(true));





});
