import Fraction from "fraction.js"

import { NumberInput } from "./NumberInput";
import { Utils } from "../utils/Utils";

/** Handles button listening, Fraction calculations, and displaying the results via KaTeX */
export class Calculation {
  private operation: HTMLSelectElement;
  private kind: HTMLSelectElement;
  private btn: HTMLButtonElement;
  private div: HTMLDivElement;
  private tex: HTMLParagraphElement;

  constructor(selectors: {
    operationId: string,
    kindId: string,
    btnId: string,
    divId: string,
    texId: string,
  }) {
    this.operation = Utils.getValidatedElement(
      selectors.operationId, HTMLSelectElement
    ) as HTMLSelectElement;
    this.kind = Utils.getValidatedElement(
      selectors.kindId, HTMLSelectElement
    ) as HTMLSelectElement;
    this.btn = Utils.getValidatedElement(
      selectors.btnId, HTMLButtonElement
    ) as HTMLButtonElement;
    this.div = Utils.getValidatedElement(
      selectors.divId, HTMLDivElement
    ) as HTMLDivElement;
    this.tex = Utils.getValidatedElement(
      selectors.texId, HTMLParagraphElement
    ) as HTMLParagraphElement;
  }

  /**
   * Attaches an event listener to the calculate button to display the result when clicked. 
   * Division by zero will trigger an alert and no result will be shown.
   * @param firstNumber - The NumberInput object for the first number
   * @param secondNumber - The NumberInput object for the second number
   */
  public listenAndCalculate(firstNumber: NumberInput, secondNumber: NumberInput): void {
    this.btn.addEventListener('click', () => {
      const firstFrac: Fraction = firstNumber.getFraction();
      const secondFrac: Fraction = secondNumber.getFraction();
      if (this.operation.value === '÷' && secondFrac.valueOf() === 0) {
        this.div.hidden = true;
        alert('Cannot divide by 0');
        return;
      } else {
        this.tex.textContent = this.calculate(firstFrac, secondFrac);
        this.div.hidden = false;
        Utils.renderAllTex();
      }
    });
  }

  /**
   * Perform the selected operation and format a KaTeX-ready string.
   * @param firstFrac - The first Fraction to operate on
   * @param secondFrac - The second Fraction to operate on
   * @returns - The TeX string (including $$ $$)
   */
  private calculate(firstFrac: Fraction, secondFrac: Fraction): string {

    let result = new Fraction(0, 1);
    switch (this.operation.value) {
      case '+':
        result = firstFrac.add(secondFrac);
        break;
      case '-':
        result = firstFrac.sub(secondFrac);
        break;
      case '✕':
        result = firstFrac.mul(secondFrac);
        break;
      case '÷':
        result = firstFrac.div(secondFrac);
        break;
      default:
        break;
    }

    let result_tex: string = '';
    switch (this.kind.value) {
      case 'Mixed Number':
        result_tex = "$$" + result.toLatex(true) + "$$";
        break;
      case 'Improper Fraction':
        result_tex = "$$" + result.toLatex() + "$$";
        break;
      case 'Decimal (Rounded)':
        result_tex = "$$" + result.round(6).valueOf() + "$$";
        break;
      default:
    }

    return result_tex;
  }
}
