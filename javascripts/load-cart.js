document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("cart.html");

  const html = await response.text();

  document.body.insertAdjacentHTML("beforeend", html);

  await initCartMenu();
});

async function initCartMenu() {
  const cartButton = document.querySelector(".cart-btn");
  const cartContainer = document.querySelector(".cart-container");
  const closeButton = document.querySelector(".close-cart-btn");

  cartButton.addEventListener("click", async () => {
    cartContainer.classList.remove("hidden");
    await repaintCartSidebar();
  });

  closeButton.addEventListener("click", () => {
    cartContainer.classList.add("hidden");
  });
}

async function repaintCartSidebar() {
  fillCartSidebarContent();
  calculateCartSidebarTotalPrice();

  // Применяем текущие переводы только к содержимому корзины
  // без повторной загрузки всего языкового файла
  applyTranslations(document.querySelector(".cart-content"));
}

// Делаем доступной глобально для вызова из cart-course.js
window.repaintCartSidebar = repaintCartSidebar;

function fillCartSidebarContent() {
  const cart = getCart();

  const cartContent = document.querySelector(".cart-content");

  cartContent.innerHTML = "";

  cart.courses.forEach((courseName) => {
    cartContent.appendChild(createCourseCartItem(courseName));
  });

  Object.entries(cart.merch).forEach(([merchName, quantity]) => {
    cartContent.appendChild(createMerchCartItem(merchName, quantity));
  });
}

function createCourseCartItem(courseName) {
  const item = document.createElement("div");

  item.className = "cart-item";

  item.innerHTML = `
        <h2 data-lang="${courseName}.title"></h2>
        <h2 data-lang="${courseName}.price"></h2>
    `;

  return item;
}

function createMerchCartItem(merchName, quantity) {
  const item = document.createElement("div");

  item.className = "cart-item";

  item.innerHTML = `
        <h2 data-lang="${merchName}.title"></h2>
        <div class="cart-item-price">
            <h2>${quantity}</h2>
            <h2>✕</h2>
            <h2 data-lang="${merchName}.price"></h2>
        </div>
    `;

  return item;
}

function calculateCartSidebarTotalPrice() {
  const cart = getCart();

  let totalPrice = 0;

  cart.courses.forEach((courseName) => {
    totalPrice += getPrice(`${courseName}.price`);
  });

  Object.entries(cart.merch).forEach(([merchName, quantity]) => {
    totalPrice += getPrice(`${merchName}.price`) * quantity;
  });

  let cartTotalPrice = document.querySelector(".cart-total-price");
  cartTotalPrice.textContent = totalPrice;
}

function getPrice(key) {
  const priceText = getCurrentTranslation(key);

  return Number(priceText.replace(/[^\d]/g, ""));
}
