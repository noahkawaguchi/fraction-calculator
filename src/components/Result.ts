import Fraction from "fraction.js"

/** Handles Fraction calculations and displaying the results via KaTeX */
export class Result {
  constructor(
    private operation: HTMLSelectElement,
    private kind: HTMLSelectElement,
    private div: HTMLDivElement,
    private tex: HTMLParagraphElement,
  ) {}

  /**
   * Perform the calculation and display the answer.
   * @param firstFrac - The first Fraction to use
   * @param secondFrac - The second Fraction to use
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
      case 'Decimal':
        this.tex.textContent = "$$" + result.round(6).valueOf() + "$$";
        break;
      default:
    }

    this.div.hidden = false;

  }
}
