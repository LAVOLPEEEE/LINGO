function getCart() {
  const emptyCart = {
    courses: [],
    merch: {}
  };

  return JSON.parse(localStorage.getItem("cart")) || emptyCart;
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCounter() {
  const cart = getCart();

  const coursesCount = cart.courses.length;

  const merchCount = Object.values(cart.merch)
      .reduce((sum, qty) => sum + qty, 0);

  document.getElementById("cartCount").textContent =
      coursesCount + merchCount;
}

function initCartButtons() {
  const cart = getCart();

  initCourseCartButtons(cart);
  initMerchCartButtons(cart)
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  initCartButtons();
});
