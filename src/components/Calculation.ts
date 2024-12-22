import Fraction from "fraction.js"
import { Utils } from "../utils/Utils";

/** Handles Fraction calculations and inserting TeX strings into the document */
export class Calculation {
  private operation: HTMLSelectElement;
  private kind: HTMLSelectElement;
  private div: HTMLDivElement;
  private tex: HTMLParagraphElement;

  constructor(selectors: {
    operationId: string,
    kindId: string,
    divId: string,
    texId: string,
  }) {
    this.operation = Utils.getValidatedElement(
      selectors.operationId, HTMLSelectElement
    ) as HTMLSelectElement;
    this.kind = Utils.getValidatedElement(
      selectors.kindId, HTMLSelectElement
    ) as HTMLSelectElement;
    this.div = Utils.getValidatedElement(
      selectors.divId, HTMLDivElement
    ) as HTMLDivElement;
    this.tex = Utils.getValidatedElement(
      selectors.texId, HTMLParagraphElement
    ) as HTMLParagraphElement;
  }

  /**
   * Perform the selected operation and insert a TeX-formatted string into the document.
   * Division by zero will trigger an alert and no result will be shown.
   * @param firstFrac - The first Fraction to operate on
   * @param secondFrac - The second Fraction to operate on
   */
  public calculateAndInsertTex(firstFrac: Fraction, secondFrac: Fraction): void {
    if (this.operation.value === '÷' && secondFrac.valueOf() === 0) {
      this.div.hidden = true;
      alert('Cannot divide by 0');
      return;
    }
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
        break;
    }
    this.tex.textContent = result_tex;
    this.div.hidden = false;
  }
}
