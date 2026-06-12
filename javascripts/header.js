function setActive(element) {
  let links = document.querySelectorAll("nav a");

  links.forEach(function (link) {
    link.classList.remove("active");
  });

  element.classList.add("active");
}

function setLang(button) {
  let buttons = document.querySelectorAll(".lang-btn");

  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });

  button.classList.add("active");
}

function openCart() {
  alert("Корзина открыта");
}
