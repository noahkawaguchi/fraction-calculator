import Fraction from "fraction.js"

import { Utils } from "../utils/Utils";

/** Handles Fraction calculations and displaying the results via KaTeX */
export class Result {
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
   * Perform the selected operation and display the result via KaTeX.
   * @param firstFrac - The first Fraction to operate on
   * @param secondFrac - The second Fraction to operate on
   */
  public showAnswer(firstFrac: Fraction, secondFrac: Fraction): void {

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
    
    switch (this.kind.value) {
      case 'Mixed Number':
        this.tex.textContent = "$$" + result.toLatex(true) + "$$";
        break;
      case 'Improper Fraction':
        this.tex.textContent = "$$" + result.toLatex() + "$$";
        break;
      case 'Decimal (Rounded)':
        this.tex.textContent = "$$" + result.round(6).valueOf() + "$$";
        break;
      default:
    }

    this.div.hidden = false;
    Utils.renderAllTex();
  }
}
