import "katex/dist/katex.min.css"; // KaTeX CSS

import { NumberInput } from "./components/NumberInput";
import { Calculation } from "./components/Calculation";

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

const result = new Calculation({
  operationId: 'operation',
  kindId: 'result-kind-select',
  btnId: 'calculate-btn',
  divId: 'result-div',
  texId: 'result-tex',
})

result.listenAndCalculate(firstNumber, secondNumber);
