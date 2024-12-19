import Fraction from "fraction.js";

const firstType = document.getElementById('first-kind') as HTMLSelectElement;
const firstIntegerInput = document.getElementById('first-integer') as HTMLInputElement;
const firstFractionInput = document.getElementById('first-fraction') as HTMLDivElement;
const firstNumeratorInput = document.getElementById('first-numerator') as HTMLInputElement;
const firstDenominatorInput = document.getElementById('first-denominator') as HTMLInputElement;

const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;

firstIntegerInput.addEventListener('input', enforceNumericInput);
firstNumeratorInput.addEventListener('input', enforceNumericInput);
firstDenominatorInput.addEventListener('input', enforceNumericInput);


/**
 * Set the visibility of input fields based on the user's selection of Fraction, 
 *    Mixed Number, or Integer, clearing the value of all fields on change.
 * `display` for these elements should not be set with CSS 
 *    so that `hidden` can be set to true or false here.
 */
firstType.addEventListener('change', (): void => {
  firstIntegerInput.value = '';
  firstNumeratorInput.value = '';
  firstDenominatorInput.value = '';
  switch (firstType.value) {
    case 'fraction':
      firstIntegerInput.hidden = true;
      firstFractionInput.hidden = false;
      break;
    case 'mixed-number':
      firstIntegerInput.hidden = false;
      firstFractionInput.hidden = false;
      break;
    case 'integer':
      firstIntegerInput.hidden = false;
      firstFractionInput.hidden = true;
      break;
    default:
      return;
  }
});

calculateBtn.addEventListener('click', (): void => {

  // Avoid division by 0
  if (firstDenominatorInput.value === '0') {
    alert('Denominator cannot be 0');
    return;
  }

  // Get numeric values for the first number or use default values if blank
  const firstInteger: number = firstIntegerInput.value ? parseInt(firstIntegerInput.value) : 0;
  const firstNumerator: number = firstNumeratorInput.value ? parseInt(firstNumeratorInput.value) : 0;
  const firstDenominator: number = firstDenominatorInput.value ? parseInt(firstDenominatorInput.value) : 1;

  // Convert user's values to a Fraction object
  const firstNumber: Fraction = new Fraction(
    (firstInteger * firstDenominator + firstNumerator), 
    firstDenominator,
  );

  console.log(firstNumber.toFraction(true));

  // console.log(firstInteger + 1);
  // console.log(firstNumerator + 1);
  // console.log(firstDenominator + 1);



});

/**
 * Remove any non-numeric characters from an input element as they are entered
 * @param this - the input element that the function will act upon
 * @param event - the input event that will trigger the function
 */
function enforceNumericInput(this: HTMLInputElement, event: Event): void {
  this.value = this.value.replace(/[^0-9]/g, '');
}
