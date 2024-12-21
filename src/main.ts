import "katex/dist/katex.min.css"; // Import KaTeX CSS

import { NumberInput } from "./components/NumberInput";
import { Result } from "./components/Result";

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
  document.getElementById('result-kind-select') as HTMLSelectElement,
  document.getElementById('result-div') as HTMLDivElement,
  document.getElementById('result-tex') as HTMLParagraphElement,
)

document.getElementById('calculate-btn')?.addEventListener<'click'>(
  'click', (): void => result.showAnswer(firstNumber.getFraction(), secondNumber.getFraction())
);
