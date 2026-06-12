function toggleFaq(el) {
  const item = el.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

function handleTrialSubmit() {
  const btn = document.querySelector(".form-submit");
  btn.textContent = "✓ ЗАЯВКА ПРИНЯТА! МЫ СВЯЖЕМСЯ СКОРО";
  btn.style.background = "#1DB954";
  setTimeout(() => {
    btn.textContent = "ЗАПИСАТЬСЯ НА ПРОБНЫЙ УРОК →";
    btn.style.background = "";
  }, 4000);
}
