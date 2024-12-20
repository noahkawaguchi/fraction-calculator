import Fraction from "fraction.js";
// import katex from "katex"; // Uncomment for manual rendering
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import renderMathInElement from "katex/contrib/auto-render"; // For automatic rendering

import { NumberInput } from "./components/NumberInput";
import { Result } from "./components/Result";

// Automatically render TeX in the document body
document.addEventListener("DOMContentLoaded", renderAllTex);

const firstNumber = new NumberInput(
  document.getElementById('first-negative') as HTMLParagraphElement,
  document.getElementById('first-integer') as HTMLInputElement,
  document.getElementById('first-numerator') as HTMLInputElement,
  document.getElementById('first-denominator') as HTMLInputElement,
  document.getElementById('first-sign') as HTMLSelectElement,
  document.getElementById('first-kind') as HTMLSelectElement,
);

const secondNumber = new NumberInput(
  document.getElementById('second-negative') as HTMLParagraphElement,
  document.getElementById('second-integer') as HTMLInputElement,
  document.getElementById('second-numerator') as HTMLInputElement,
  document.getElementById('second-denominator') as HTMLInputElement,
  document.getElementById('second-sign') as HTMLSelectElement,
  document.getElementById('second-kind') as HTMLSelectElement,
);

const result = new Result(
  document.getElementById('operation') as HTMLSelectElement,
  document.getElementById('result-tex') as HTMLParagraphElement,
  document.getElementById('result-kind-select') as HTMLSelectElement,
)

const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;

calculateBtn.addEventListener('click', (): void => {

  const firstFrac: Fraction = firstNumber.getFraction();
  const secondFrac: Fraction = secondNumber.getFraction();

  result.showAnswer(firstFrac, secondFrac);
  renderAllTex();

});

/** Renders all TeX in the document body */
function renderAllTex(): void {
  renderMathInElement(document.body, {
      delimiters: [
          { left: "$$", right: "$$", display: true },  // Display math
          { left: "\\(", right: "\\)", display: false } // Inline math
      ],
      throwOnError: false // Avoid errors breaking the page
  });
}
