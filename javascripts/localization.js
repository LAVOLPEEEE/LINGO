let currentTranslations = {};

export function getCurrentTranslation(key) {
  return currentTranslations[key] || key;
}

export function applyTranslations(root = document) {
  root.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.dataset.lang;
    if (currentTranslations[key]) {
      element.textContent = currentTranslations[key];
    }
  });
}

// Глобальные обёртки для файлов без импорта
window.getCurrentTranslation = getCurrentTranslation;
window.applyTranslations = applyTranslations;

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

  currentTranslations = translations;
  window.currentTranslations = translations;

  // Локализация текста
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.dataset.lang;

    if (translations[key]) {
      element.textContent = translations[key];
    }
  });

  document.querySelectorAll("[data-lang-aria]").forEach((element) => {
    const key = element.dataset.langAria;

    if (translations[key]) {
      element.setAttribute("aria-label", translations[key]);
    }
  });

  document.querySelectorAll("[data-lang-placeholder]").forEach((element) => {
    const key = element.dataset.langPlaceholder;

    if (translations[key]) {
      element.placeholder = translations[key];
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

  // Обновляем надписи кнопок корзины
  if (typeof window.updateCourseCartTexts === "function") {
    window.updateCourseCartTexts();
  }

  // Обновляем текущее слово в анимации смены слов (changing-word)
  if (typeof window.refreshChangingWord === "function") {
    window.refreshChangingWord();
  }

  if (window._sliderReady) {
    window.refreshSlider();
  } else {
    window._pendingSliderRefresh = true;
  }

  if (window.refreshOpenedModal) {
    window.refreshOpenedModal();
  }
}

// Настройка кнопок для переключения языка
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
