import { Utils } from "./Utils";

describe('getValidatedElement', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <h1 id="title">This is my title.</h1>
      <input id="input-field">
    `;
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns a valid element', () => {
    const title = Utils.getValidatedElement('title', HTMLHeadingElement);
    const input = Utils.getValidatedElement('input-field', HTMLInputElement);
    expect(title.textContent).toBe('This is my title.');
    expect(input).toBeInTheDocument();
  });

  test("throws an error for an element that doesn't exist", () => {
    expect(Utils.getValidatedElement('not-here', HTMLParagraphElement))
      .toThrow('Element with ID "not-here" not found');
  });

  test('throws an error for an element of the incorrect type', () => {
    expect(Utils.getValidatedElement('input-field', HTMLSelectElement))
      .toThrow('Element with ID "input-field" is not of type HTMLSelectElement');
  });

});
