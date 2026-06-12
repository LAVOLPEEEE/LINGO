const words = ["удобный", "гибкий", "успешный"];
const wordElement = document.querySelector(".changing-word");

let currentIndex = 0;

setInterval(() => {
  wordElement.classList.add("hide");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % words.length;
    wordElement.textContent = words[currentIndex];
    wordElement.classList.remove("hide");
  }, 450);
}, 2500);
