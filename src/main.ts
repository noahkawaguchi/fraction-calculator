import "katex/dist/katex.min.css"; // KaTeX CSS

import { NumberInput } from "./components/NumberInput";
import { Result } from "./components/Result";

const firstNumber = new NumberInput({
  negativeSignId: 'first-negative',
  integerInputId: 'first-integer',
  numeratorInputId: 'first-numerator',
  denominatorInputId: 'first-denominator',
  signSelectId: 'first-sign',
  kindSelectId: 'first-kind',
});

const secondNumber = new NumberInput({
  negativeSignId: 'second-negative',
  integerInputId: 'second-integer',
  numeratorInputId: 'second-numerator',
  denominatorInputId: 'second-denominator',
  signSelectId: 'second-sign',
  kindSelectId: 'second-kind',
});

const result = new Result({
  operationId: 'operation',
  kindId: 'result-kind-select',
  divId: 'result-div',
  texId: 'result-tex',
})

document.getElementById('calculate-btn')?.addEventListener<'click'>(
  'click', (): void => result.showAnswer(firstNumber.getFraction(), secondNumber.getFraction())
);
