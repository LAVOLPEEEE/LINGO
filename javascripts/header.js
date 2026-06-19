function setActive(element) {
  let links = document.querySelectorAll("nav a");

  links.forEach(function (link) {
    link.classList.remove("active");
  });

  element.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector(".cart-btn");

  cartButton.addEventListener("click", openCart);
});

function openCart() {
  const cart = document.getElementById("cart-container");

  if (!cart) {
    return;
  }

  cart.classList.remove("hidden");
}