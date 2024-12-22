import "katex/dist/katex.min.css"; // KaTeX CSS
import { NumberInput } from "./components/NumberInput";
import { Calculation } from "./components/Calculation";
import { Utils } from "./utils/Utils";

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

const calculation = new Calculation({
  operationId: 'operation',
  kindId: 'result-kind-select',
  divId: 'result-div',
  texId: 'result-tex',
})

Utils.getValidatedElement('calculate-btn', HTMLButtonElement).addEventListener('click', () => {
  calculation.calculateAndInsertTex(firstNumber.getFraction(), secondNumber.getFraction());
  Utils.renderAllTex();
});
