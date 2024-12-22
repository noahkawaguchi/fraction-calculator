import { screen } from '@testing-library/dom'

import { Utils } from "./Utils";

describe('getValidatedElement', () => {

  beforeAll(() => {
    document.body.innerHTML = `
      <h1 id="title">This is my title.</h1>
      <input id="input-field">
    `;
  });

  it('should retrieve and return the element if valid', () => {
    const title = Utils.getValidatedElement('title', HTMLHeadingElement);
    const input = Utils.getValidatedElement('input-field', HTMLInputElement);
    expect(title).toHaveTextContent('This is my title.');
    expect(input).toBeInTheDocument();
  });

  it("should throw an error for an element that doesn't exist", () => {
    expect(() => Utils.getValidatedElement('not-here', HTMLParagraphElement))
      .toThrow('Element with ID "not-here" not found');
  });

  it('should throw an error for an element of the incorrect type', () => {
    expect(() => Utils.getValidatedElement('input-field', HTMLSelectElement))
      .toThrow('Element with ID "input-field" is not of type HTMLSelectElement');
  });

});

/** 
 * It is difficult to test this method in much detail without manual visual 
 * inspection due to the intricate HTML and CSS that KaTeX generates.
 */
describe('renderAllTex', () => {

  beforeEach(() => {
    document.body.innerHTML = '<p id="tex">no TeX here yet</p>';
  });
  
  it('should render inline math', () => {
    const tex: HTMLParagraphElement = screen.getByText('no TeX here yet');
    tex.textContent = '\\( \\frac{3}{4} \\)';
    Utils.renderAllTex();
    const inline = document.querySelector('.katex');
    expect(inline).toBeInTheDocument();
  });

  it('should render display math', () => {
    const tex: HTMLParagraphElement = screen.getByText('no TeX here yet');
    tex.textContent = '$$\\frac{1}{2}$$';
    Utils.renderAllTex();
    const display = document.querySelector('.katex-display');
    expect(display).toBeInTheDocument();
  });

});
