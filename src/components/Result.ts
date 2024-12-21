import Fraction from "fraction.js"
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import renderMathInElement from "katex/contrib/auto-render"; // For automatic rendering

/** Handles Fraction calculations and displaying the results via KaTeX */
export class Result {
  constructor(
    private operation: HTMLSelectElement,
    private kind: HTMLSelectElement,
    private div: HTMLDivElement,
    private tex: HTMLParagraphElement,
  ) {}

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
      case 'Decimal':
        this.tex.textContent = "$$" + result.round(6).valueOf() + "$$";
        break;
      default:
    }

    this.div.hidden = false;
    this.renderAllTex();
  }

  /** Renders all TeX in the document body */
  private renderAllTex(): void {
    renderMathInElement(document.body, {
        delimiters: [
            { left: "$$", right: "$$", display: true },  // Display math
            { left: "\\(", right: "\\)", display: false } // Inline math
        ],
        throwOnError: false // Avoid errors breaking the page
    });
  }
}
