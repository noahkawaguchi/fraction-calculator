import Fraction from "fraction.js";

/**
 * Handles element visibility and input validation for user input of numbers
 */
export class NumberInput {
  constructor(
    private kindSelect: HTMLSelectElement,
    private integerInput: HTMLInputElement,
    private numeratorInput: HTMLInputElement,
    private denominatorInput: HTMLInputElement,
  ) {
    this.kindSelect.addEventListener<'change'>('change', this.responsiveInputVisibility.bind(this));
    this.integerInput.addEventListener<'input'>('input', this.enforceNumericInput);
    this.numeratorInput.addEventListener<'input'>('input', this.enforceNumericInput);
    this.denominatorInput.addEventListener<'input'>('input', this.enforceNumericInput);
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
      case 'fraction':
        this.integerInput.hidden = true;
        this.numeratorInput.hidden = false;
        this.denominatorInput.hidden = false;
        break;
      case 'mixed-number':
        this.integerInput.hidden = false;
        this.numeratorInput.hidden = false;
        this.denominatorInput.hidden = false;
        break;
      case 'integer':
        this.integerInput.hidden = false;
        this.numeratorInput.hidden = true;
        this.denominatorInput.hidden = true;
        break;
      default:
        return;
    }
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
    return ret;
  }


}
