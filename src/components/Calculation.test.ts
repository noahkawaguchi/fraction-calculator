import Fraction from "fraction.js";
import { screen } from '@testing-library/dom';
import userEvent from "@testing-library/user-event";
import { Calculation } from "./Calculation";

describe('Calculation', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <label for="operation">Operation:</label>
        <select id="operation">
          <option selected>+</option>
          <option>-</option>
          <option>✕</option>
          <option>÷</option>
        </select>
      <label for="kind-select">Show result as:</label>
      <select name="kind-select" id="kind-select">
        <option selected>Mixed Number</option>
        <option>Improper Fraction</option>
        <option>Decimal (Rounded)</option>
      </select>
      <div id="result-div" hidden>
        <p id="result-label">Result:</p>
        <p id="result-tex" aria-labelledby="result-label"></p>
      </div>
    `;
  });

  it('should insert correct and properly formatted TeX into the document', async () => {
    const calculation = new Calculation({
      operationId: 'operation',
      kindId: 'kind-select',
      divId: 'result-div',
      texId: 'result-tex',
    })
    const operation: HTMLSelectElement = screen.getByLabelText('Operation:');
    const kindSelect: HTMLSelectElement = screen.getByLabelText('Show result as:');
    const tex: HTMLParagraphElement = screen.getByLabelText('Result:');

    const frac1 = new Fraction(3, 4);
    const frac2 = new Fraction(5, 7);
    calculation.calculateAndInsertTex(frac1, frac2); // Default is addition
    expect(tex).toHaveTextContent('$$1\\frac{13}{28}$$'); // Default is mixed number

    await userEvent.selectOptions(operation, '-');
    await userEvent.selectOptions(kindSelect, 'Improper Fraction');
    const frac3 = new Fraction(-4, 3);
    const frac4 = new Fraction(9, 8);
    calculation.calculateAndInsertTex(frac3, frac4);
    expect(tex).toHaveTextContent('$$-\\frac{59}{24}$$');

    await userEvent.selectOptions(operation, '✕');
    await userEvent.selectOptions(kindSelect, 'Decimal (Rounded)');
    const frac5 = new Fraction(-20, 17);
    const frac6 = new Fraction(-7, 30);
    calculation.calculateAndInsertTex(frac5, frac6);
    expect(tex).toHaveTextContent('$$0.27451$$');

    await userEvent.selectOptions(operation, '÷');
    await userEvent.selectOptions(kindSelect, 'Mixed Number');
    const frac7 = new Fraction(200, 51);
    const frac8 = new Fraction(-3, 2);
    calculation.calculateAndInsertTex(frac7, frac8);
    expect(tex).toHaveTextContent('$$-2\\frac{94}{153}$$');
  });

  it('should unhide the result display after a successful calculation', async () => {
    const calculation = new Calculation({
      operationId: 'operation',
      kindId: 'kind-select',
      divId: 'result-div',
      texId: 'result-tex',
    })
    const tex: HTMLParagraphElement = screen.getByLabelText('Result:');
    const frac1 = new Fraction(1, 2);
    const frac2 = new Fraction(5, 3);
    expect(tex).not.toBeVisible();
    calculation.calculateAndInsertTex(frac1, frac2);
    expect(tex).toBeVisible();
  });

  it('should gracefully reject division by zero', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const calculation = new Calculation({
      operationId: 'operation',
      kindId: 'kind-select',
      divId: 'result-div',
      texId: 'result-tex',
    })
    const operation: HTMLSelectElement = screen.getByLabelText('Operation:');
    const tex: HTMLParagraphElement = screen.getByLabelText('Result:');

    // Normal operation
    const frac1 = new Fraction(4, 1);
    const frac2 = new Fraction(2, 3);
    calculation.calculateAndInsertTex(frac1, frac2);
    expect(tex).toBeVisible();

    // Problem operation
    await userEvent.selectOptions(operation, '÷');
    const frac3 = new Fraction(4, 5);
    const frac4 = new Fraction(0, 2);
    calculation.calculateAndInsertTex(frac3, frac4);
    expect(tex).not.toBeVisible();
    expect(alertMock).toHaveBeenCalledWith('Cannot divide by 0');

    alertMock.mockRestore();
  });

});
