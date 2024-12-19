import Fraction from "fraction.js";

const firstKind = document.getElementById('first-kind') as HTMLSelectElement;
const firstIntegerInput = document.getElementById('first-integer') as HTMLInputElement;
const firstNumeratorInput = document.getElementById('first-numerator') as HTMLInputElement;
const firstDenominatorInput = document.getElementById('first-denominator') as HTMLInputElement;

const secondKind = document.getElementById('second-kind') as HTMLSelectElement;
const secondIntegerInput = document.getElementById('second-integer') as HTMLInputElement;
const secondNumeratorInput = document.getElementById('second-numerator') as HTMLInputElement;
const secondDenominatorInput = document.getElementById('second-denominator') as HTMLInputElement;

const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;


firstIntegerInput.addEventListener('input', enforceNumericInput);
firstNumeratorInput.addEventListener('input', enforceNumericInput);
firstDenominatorInput.addEventListener('input', enforceNumericInput);

secondIntegerInput.addEventListener('input', enforceNumericInput);
secondNumeratorInput.addEventListener('input', enforceNumericInput);
secondDenominatorInput.addEventListener('input', enforceNumericInput);

firstKind.addEventListener('change', (event: Event) => {
  const target = event.currentTarget as HTMLSelectElement;
  responsiveInputVisibility.call(target, firstIntegerInput, firstNumeratorInput, firstDenominatorInput);
});

secondKind.addEventListener('change', (event: Event) => {
  const target = event.currentTarget as HTMLSelectElement;
  responsiveInputVisibility.call(target, secondIntegerInput, secondNumeratorInput, secondDenominatorInput);
});

calculateBtn.addEventListener('click', (): void => {

  // Avoid division by 0
  if (firstDenominatorInput.value === '0') {
    alert('Denominator cannot be 0');
    return;
  }

  // Get numeric values for the first number or use default values if blank
  const firstInteger: number = firstIntegerInput.value 
                                 ? parseInt(firstIntegerInput.value) 
                                 : 0;
  const firstNumerator: number = firstNumeratorInput.value 
                                   ? parseInt(firstNumeratorInput.value) 
                                   : 0;
  const firstDenominator: number = firstDenominatorInput.value 
                                   ? parseInt(firstDenominatorInput.value) 
                                   : 1;

  // Convert user's values to a Fraction object
  const firstNumber: Fraction = new Fraction(
    (firstInteger * firstDenominator + firstNumerator), 
    firstDenominator,
  );

  console.log(firstNumber.toFraction(true));





});

/**
 * Remove any non-numeric characters from an input element as they are entered
 * @param this - the input element that the function will act upon
 */
function enforceNumericInput(this: HTMLInputElement): void {
  this.value = this.value.replace(/[^0-9]/g, '');
}

/**
 * Set the visibility of input fields based on the user's selection of Fraction, 
 *    Mixed Number, or Integer, clearing the value of all fields on change. 
 *    `display` for these elements should not be set with CSS so that `hidden` 
 *    can be set to true or false here.
 * 
 * @param this - the select element where the user chooses the type of number
 * @param integer - the input element for the integer part of the number
 * @param numerator - the input element for the numerator part of the number
 * @param denominator - the input element for the denominator part of the number
 */
function responsiveInputVisibility(
  this: HTMLSelectElement, 
  integer: HTMLInputElement, 
  numerator: HTMLInputElement, 
  denominator: HTMLInputElement,
): void {
  integer.value = '';
  numerator.value = '';
  denominator.value = '';
  switch (this.value) {
    case 'fraction':
      integer.hidden = true;
      numerator.hidden = false;
      denominator.hidden = false;
      break;
    case 'mixed-number':
      integer.hidden = false;
      numerator.hidden = false;
      denominator.hidden = false;
      break;
    case 'integer':
      integer.hidden = false;
      numerator.hidden = true;
      denominator.hidden = true;
      break;
    default:
      return;
  }
}
