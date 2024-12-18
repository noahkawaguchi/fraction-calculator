import Fraction from "fraction.js";

const tagLine = document.getElementById('tag-line') as HTMLParagraphElement;
const testBtn = document.getElementById('test-btn') as HTMLButtonElement;

testBtn.addEventListener('click', () => {
  const myFrac: Fraction = new Fraction(3, 4);
  const yourFrac: Fraction = new Fraction(1, 2);
  const sum: Fraction = myFrac.add(yourFrac);
  tagLine.textContent += ' ' + sum.toFraction();
});
