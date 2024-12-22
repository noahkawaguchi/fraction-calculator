import Fraction from "fraction.js";

import { Utils } from "../utils/Utils";

/** 
 * Handles element visibility, input validation, and Fraction conversion for user input of numbers.
 */
export class NumberInput {
  private negativeSign: HTMLParagraphElement;
  private integerInput: HTMLInputElement;
  private numeratorInput: HTMLInputElement;
  private denominatorInput: HTMLInputElement;
  private signSelect: HTMLSelectElement;
  private kindSelect: HTMLSelectElement;

  constructor(selectors: {
    negativeSignId: string,
    integerInputId: string,
    numeratorInputId: string,
    denominatorInputId: string,
    signSelectId: string,
    kindSelectId: string,
  }) {
    this.negativeSign = Utils.getValidatedElement(
      selectors.negativeSignId, HTMLParagraphElement
    ) as HTMLParagraphElement;
    this.integerInput = Utils.getValidatedElement(
      selectors.integerInputId, HTMLInputElement
    ) as HTMLInputElement;
    this.numeratorInput = Utils.getValidatedElement(
      selectors.numeratorInputId, HTMLInputElement
    ) as HTMLInputElement;
    this.denominatorInput = Utils.getValidatedElement(
      selectors.denominatorInputId, HTMLInputElement
    ) as HTMLInputElement;
    this.signSelect = Utils.getValidatedElement(
      selectors.signSelectId, HTMLSelectElement
    ) as HTMLSelectElement;
    this.kindSelect = Utils.getValidatedElement(
      selectors.kindSelectId, HTMLSelectElement
    ) as HTMLSelectElement;
    
    this.integerInput.addEventListener('input', this.enforceNumericInput);
    this.numeratorInput.addEventListener('input', this.enforceNumericInput);
    this.denominatorInput.addEventListener('input', this.enforceNonzeroNumericInput);
    this.signSelect.addEventListener('change', this.negativeVisibility.bind(this));
    this.kindSelect.addEventListener('change', this.responsiveInputVisibility.bind(this));
  }
  
  /**
   * Creates a Fraction object from the user's inputs. 
   * @returns the Fraction object
   */
  public getFraction(): Fraction {
    const integerPart: number = parseInt(this.integerInput.value);
    const numeratorPart: number = parseInt(this.numeratorInput.value);
    const denominatorPart: number = parseInt(this.denominatorInput.value);
    const ret = new Fraction((integerPart * denominatorPart + numeratorPart), denominatorPart);
    if (this.signSelect.value === 'Negative') {
      return ret.neg();
    }
    return ret;
  }

  /** Hides or shows the negative sign depending on the user's selection. */
  private negativeVisibility(): void {
    if (this.signSelect.value === 'Negative') {
      this.negativeSign.hidden = false;
    } else {
      this.negativeSign.hidden = true;
    }
  }

  /**
   * Removes any non-numeric characters from an input element as they are entered.
   * @param event - the input event that triggers the method
   */
  private enforceNumericInput(event: Event): void {
    const target = event.currentTarget as HTMLInputElement;
    target.value = target.value.replace(/[^\d]/g, '');
  }

  /**
   * Removes any non-numeric characters from an input element as they are entered and prevents 
   * division by zero. Entering only 0s in the denominator will trigger an alert and the value 
   * will revert to 1. 
   * @param event - the input event that triggers the method
   */
  private enforceNonzeroNumericInput(event: Event): void {
    const target = event.currentTarget as HTMLInputElement;
    target.value = target.value.replace(/[^\d]/g, ''); // Numeric only
    const allZeros: RegExp = /^0+$/;
    if (allZeros.test(target.value)) {
      target.value = '1';
      alert('Denominator cannot be 0');
      return;
    }
  }

  /**
   * Sets the input fields visibility and values.
   * 
   * This method resets the input fields' values to their default 0 0/1 (integer=0, numerator=0, 
   * denominator=1) and sets their visibility based on the user's selected type of number. 
   * `display` for the input elements should not be set with CSS so that `hidden` can be set to 
   * true or false here.
   */
  private responsiveInputVisibility(): void {
    this.integerInput.value = '0';
    this.numeratorInput.value = '0';
    this.denominatorInput.value = '1';
    switch (this.kindSelect.value) {
      case 'Fraction':
        this.integerInput.hidden = true;
        this.numeratorInput.hidden = false;
        this.denominatorInput.hidden = false;
        break;
      case 'Mixed Number':
        this.integerInput.hidden = false;
        this.numeratorInput.hidden = false;
        this.denominatorInput.hidden = false;
        break;
      case 'Integer':
        this.integerInput.hidden = false;
        this.numeratorInput.hidden = true;
        this.denominatorInput.hidden = true;
        break;
      default:
        return;
    }
  }
}
