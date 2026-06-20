const wordKeys = ["changingWord.0", "changingWord.1", "changingWord.2"];

const wordElement = document.querySelector(".changing-word");

let currentIndex = 0;

function getWordText(index) {
  const key = wordKeys[index];
  return window.getCurrentTranslation ? window.getCurrentTranslation(key) : key;
}

function refreshChangingWord() {
  if (wordElement) {
    wordElement.textContent = getWordText(currentIndex);
  }
}

window.refreshChangingWord = refreshChangingWord;

refreshChangingWord();

setInterval(() => {
  if (!wordElement) return;

  wordElement.classList.add("hide");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % wordKeys.length;
    wordElement.textContent = getWordText(currentIndex);
    wordElement.classList.remove("hide");
  }, 450);
}, 2500);
