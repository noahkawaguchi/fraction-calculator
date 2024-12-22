import Fraction from 'fraction.js';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { NumberInput } from "./NumberInput";

describe('NumberInput instance', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <p id="negative-sign" hidden>—</p>
      <label for="integer-input" style="display: none;">Integer part:</label>
      <input id="integer-input" type="number" value="0" min="0" inputmode="numeric" 
             onclick="this.select()" hidden>
      <label for="numerator-input" style="display: none;">Numerator:</label>
      <input id="numerator-input" type="number" value="0" min="0" inputmode="numeric"
             onclick="this.select()">
      <label for="denominator-input" style="display: none;">Denominator:</label>
      <input id="denominator-input" type="number" value="1" min="1" inputmode="numeric"
             onclick="this.select()">
      <label for="sign-select">Sign:</label>
      <select name="sign-select" id="sign-select">
        <option selected>Positive</option>
        <option>Negative</option>
      </select>
      <label for="kind-select">Kind:</label>
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
    const signSelect: HTMLSelectElement = screen.getByRole('combobox', { name: 'Sign:' });
    expect(negativeSign).not.toBeVisible();
    await userEvent.selectOptions(signSelect, 'Negative');
    expect(negativeSign).toBeVisible();
    await userEvent.selectOptions(signSelect, 'Positive');
    expect(negativeSign).not.toBeVisible();
  });

  it('should show and hide the number input fields in response to user selection', async () => {
    const kindSelect: HTMLSelectElement = screen.getByRole('combobox', { name: 'Kind:' });
    const integerInput: HTMLInputElement = screen.getByLabelText('Integer part:');
    const numeratorInput: HTMLInputElement = screen.getByLabelText('Numerator:');
    const denominatorInput: HTMLInputElement = screen.getByLabelText('Denominator:');
    expect(integerInput).not.toBeVisible();
    expect(numeratorInput).toBeVisible();
    expect(denominatorInput).toBeVisible();
    await userEvent.selectOptions(kindSelect, 'Mixed Number');
    expect(integerInput).toBeVisible();
    expect(numeratorInput).toBeVisible();
    expect(denominatorInput).toBeVisible();
    await userEvent.selectOptions(kindSelect, 'Integer');
    expect(integerInput).toBeVisible();
    expect(numeratorInput).not.toBeVisible();
    expect(denominatorInput).not.toBeVisible();
    await userEvent.selectOptions(kindSelect, 'Fraction');
    expect(integerInput).not.toBeVisible();
    expect(numeratorInput).toBeVisible();
    expect(denominatorInput).toBeVisible();
  });

  it('should reset the inputs to 0,0,1 when the user changes the kind of number', async () => {
    const kindSelect: HTMLSelectElement = screen.getByRole('combobox', { name: 'Kind:' });
    const integerInput: HTMLInputElement = screen.getByLabelText('Integer part:');
    const numeratorInput: HTMLInputElement = screen.getByLabelText('Numerator:');
    const denominatorInput: HTMLInputElement = screen.getByLabelText('Denominator:');
    await userEvent.type(numeratorInput, '123');
    await userEvent.type(denominatorInput, '456');
    expect(integerInput).toHaveValue(0);
    expect(numeratorInput).toHaveValue(123);
    expect(denominatorInput).toHaveValue(456);
    await userEvent.selectOptions(kindSelect, 'Mixed Number');
    expect(integerInput).toHaveValue(0);
    expect(numeratorInput).toHaveValue(0);
    expect(denominatorInput).toHaveValue(1);
    await userEvent.type(integerInput, '123');
    await userEvent.type(numeratorInput, '456');
    await userEvent.type(denominatorInput, '789');
    expect(integerInput).toHaveValue(123);
    expect(numeratorInput).toHaveValue(456);
    expect(denominatorInput).toHaveValue(789);
    await userEvent.selectOptions(kindSelect, 'Integer');
    expect(integerInput).toHaveValue(0);
    expect(numeratorInput).toHaveValue(0);
    expect(denominatorInput).toHaveValue(1);
  });

  it('should reject input of any non-numeric characters, including negative signs', async () => {
    const kindSelect: HTMLSelectElement = screen.getByRole('combobox', { name: 'Kind:' });
    const integerInput: HTMLInputElement = screen.getByLabelText('Integer part:');
    const numeratorInput: HTMLInputElement = screen.getByLabelText('Numerator:');
    const denominatorInput: HTMLInputElement = screen.getByLabelText('Denominator:');
    await userEvent.selectOptions(kindSelect, 'Mixed Number');
    await userEvent.type(integerInput, '-123');
    expect(integerInput).toHaveValue(123);
    await userEvent.type(numeratorInput, 'abc&4*5#6!');
    expect(numeratorInput).toHaveValue(456);
    await userEvent.type(denominatorInput, '𝛼𝛽𝛾 123 こんにちは👋🏼 456 世界🌏 789 →∅²');
    expect(denominatorInput).toHaveValue(123456789);
  });

  it('should disallow zero in the denominator', async () => {
    const denominatorInput: HTMLInputElement = screen.getByLabelText('Denominator:');
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Allow "0" characters that are part of nonzero numbers
    await userEvent.type(denominatorInput, '2009');
    expect(denominatorInput).toHaveValue(2009);
    await userEvent.click(denominatorInput);
    await userEvent.paste('00100');
    expect(denominatorInput).toHaveValue(100);

    // Reject inputs that have a value of zero
    await userEvent.type(denominatorInput, '0');
    expect(denominatorInput).toHaveValue(1);
    expect(alertMock).toHaveBeenCalledWith('Denominator cannot be 0');
    await userEvent.click(denominatorInput);
    await userEvent.paste('-000');
    expect(denominatorInput).toHaveValue(1);
    expect(alertMock).toHaveBeenCalledWith('Denominator cannot be 0');

    alertMock.mockRestore();
  });

});

describe('getFraction', () => {
  it('should create a Fraction object from user inputs', async () => {
    document.body.innerHTML = `
      <p id="negative-sign" hidden>—</p>
      <label for="integer-input" style="display: none;">Integer part:</label>
      <input id="integer-input" type="number" value="0" min="0" inputmode="numeric" 
            onclick="this.select()" hidden>
      <label for="numerator-input" style="display: none;">Numerator:</label>
      <input id="numerator-input" type="number" value="0" min="0" inputmode="numeric"
            onclick="this.select()">
      <label for="denominator-input" style="display: none;">Denominator:</label>
      <input id="denominator-input" type="number" value="1" min="1" inputmode="numeric"
            onclick="this.select()">
      <label for="sign-select">Sign:</label>
      <select name="sign-select" id="sign-select">
        <option selected>Positive</option>
        <option>Negative</option>
      </select>
      <label for="kind-select">Kind:</label>
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

    const signSelect: HTMLSelectElement = screen.getByRole('combobox', { name: 'Sign:' });
    const kindSelect: HTMLSelectElement = screen.getByRole('combobox', { name: 'Kind:' });
    const integerInput: HTMLInputElement = screen.getByLabelText('Integer part:');
    const numeratorInput: HTMLInputElement = screen.getByLabelText('Numerator:');
    const denominatorInput: HTMLInputElement = screen.getByLabelText('Denominator:');

    await userEvent.type(numeratorInput, '3');
    await userEvent.type(denominatorInput, '4');
    const fraction1: Fraction = ni.getFraction();
    expect(Number(fraction1.n.valueOf())).toBe(3);
    expect(Number(fraction1.d.valueOf())).toBe(4);

    await userEvent.selectOptions(kindSelect, 'Mixed Number');
    await userEvent.selectOptions(signSelect, 'Negative');
    await userEvent.type(integerInput, '2');
    await userEvent.type(numeratorInput, '3');
    await userEvent.type(denominatorInput, '5');
    const fraction2: Fraction = ni.getFraction();
    expect(Number(fraction2.n.valueOf())).toBe(13);
    expect(Number(fraction2.d.valueOf())).toBe(5);
    expect(Number(fraction2.s.valueOf())).toBe(-1);

    await userEvent.selectOptions(kindSelect, 'Integer');
    await userEvent.type(integerInput, '50');
    const fraction3: Fraction = ni.getFraction();
    expect(Number(fraction3.n.valueOf())).toBe(50);
    expect(Number(fraction3.d.valueOf())).toBe(1);
  });
});
