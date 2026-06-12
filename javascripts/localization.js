async function setLang(lang, button) {
  let buttons = document.querySelectorAll(".lang-btn");

  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  await loadLanguage(lang);
}

async function loadLanguage(lang) {
  const module = await import(`../locales/${lang}.js`);

  const translations = module.default;

  // Локализация текста
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.dataset.lang;

    if (translations[key]) {
      element.textContent = translations[key];
    }
  });

  // Локализация фото
  document.querySelectorAll("[data-lang-img]").forEach((img) => {
    const key = `img.${img.dataset.langImg}`;

    if (translations[key]) {
      img.src = translations[key];
    }
  });

  localStorage.setItem("language", lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLang(btn.dataset.langBtn, btn);
  });
});

// При перезагрузке страницы достаем язык из local storage и применяем локализацию
document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("language") || "ru";

  await loadLanguage(savedLang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");

    if (btn.textContent.toLowerCase() === savedLang) {
      btn.classList.add("active");
    }
  });
});
