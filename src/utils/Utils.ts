import renderMathInElement from "katex/contrib/auto-render"; // For KaTeX automatic rendering

export class Utils {

  /**
   * Attempts to retrieve an element from the DOM, throwing an 
   * error if it does not exist or is not the correct type.
   * @param id - The id of the element to be retrieved
   * @param type - The type of the element to be retrieved
   * @returns The validated HTML element
   */
  static getValidatedElement(id: string, type: any): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element with ID "${id}" not found`);
    }
    if (!(element instanceof type)) {
      throw new Error(`Element with ID ${id} is not of type ${type.name}`)
    }
    return element;
  }

  /** Renders all TeX in the document body */
  static renderAllTex(): void {
    renderMathInElement(document.body, {
        delimiters: [
            { left: "$$", right: "$$", display: true },  // Display math
            { left: "\\(", right: "\\)", display: false } // Inline math
        ],
        throwOnError: false // Avoid errors breaking the page
    });
  }

}
