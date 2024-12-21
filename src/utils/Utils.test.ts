import { Utils } from "./Utils";

describe('Utils', () => {
  test('getValidatedElement returns a valid element', () => {
    document.body.innerHTML = '<h1 id="title">This is my title.<h1>';
    const title = Utils.getValidatedElement('title', HTMLHeadingElement);
    expect(title.textContent).toBe('This is my title.');
  });
});
