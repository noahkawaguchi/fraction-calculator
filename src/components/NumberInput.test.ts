import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { NumberInput } from "./NumberInput";

describe('NumberInput', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <p id="negative-sign" hidden>—</p>
      <input id="integer-input" type="number" value="0" min="0" hidden>
      <input id="numerator-input" type="number" value="0" min="0">
      <input id="denominator-input" type="number" value="1" min="1">
      <select name="sign-select" id="sign-select">
        <option selected>Positive</option>
        <option>Negative</option>
      </select>
      <select name="kind-select" id="kind-select">
        <option selected>Fraction</option>
        <option>Mixed Number</option>
        <option>Integer</option>
      </select>
    `;

    const ni = new NumberInput({
      negativeSignId: 'negative-sign',
      integerInputId: 'integer-input',
      numeratorInputId: 'numerator-input',
      denominatorInputId: 'denominator-input',
      signSelectId: 'sign-select',
      kindSelectId: 'kind-select',
    });

  });

  it('should show and hide the negative sign in response to user selection', async () => {
    const negativeSign: HTMLParagraphElement = screen.getByText('—');
    // const signSelect: HTMLSelectElement = screen.getByRole('combobox'); // There's more than one - labels necessary
  });

  // TODO: use async/await for userEvent tests

});
