function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCounter() {
  const cart = getCart();

  document.getElementById("cartCount").textContent = cart.length;
}

function initCartButtons() {
  const cart = getCart();

  document.querySelectorAll(".btn-cart").forEach((button) => {
    const card = button.closest(".card-course");

    const courseName = card.dataset.courseName;

    if (cart.includes(courseName)) {
      button.classList.add("button-in-cart");

      button.textContent = getCurrentTranslation("course-button-cart-in");
    }

    button.addEventListener("click", () => {
      toggleCart(courseName, button);
    });
  });
}

function toggleCart(courseName, button) {
  let cart = getCart();

  const exists = cart.includes(courseName);

  if (exists) {
    cart = cart.filter((name) => name !== courseName);

    button.classList.remove("button-in-cart");

    button.textContent = getCurrentTranslation("course-button-cart-add");
  } else {
    cart.push(courseName);

    button.classList.add("button-in-cart");

    button.textContent = getCurrentTranslation("course-button-cart-in");
  }

  saveCart(cart);
  updateCartCounter();
}

function updateCartTexts() {
  const cart = getCart();

  document.querySelectorAll(".btn-cart").forEach((button) => {
    const card = button.closest(".card-course");

    const courseName = card.dataset.courseName;

    button.textContent = cart.includes(courseName)
      ? getCurrentTranslation("course-button-cart-in")
      : getCurrentTranslation("course-button-cart-add");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  initCartButtons();
});
