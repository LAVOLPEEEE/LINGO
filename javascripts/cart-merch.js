// Добавляет поведение к кнопкам "В корзину" для мерчей и добавляет счетчик, если мерчи уже были добавлены в корзину
function initMerchCartButtons(cart) {
    document.querySelectorAll(".btn-cart-merch")
        .forEach(button => {

            const card = button.closest(".card-merch");
            const merchName = card.dataset.merchName;

            const qty = cart.merch[merchName] || 0;

            if (qty > 0) {
                renderMerchCounter(button, merchName, qty);
            }

            button.addEventListener("click", async () => {
                await addMerch(merchName, button);
            });
        });
}

// При нажатии на кнопку добавить первый мерч в корзину
async function addMerch(merchName, button) {
    const cart = getCart();

    cart.merch[merchName] = 1;

    // Обновляем корзину
    saveCart(cart);

    // К текущему мерчу добавляем счетчик
    renderMerchCounter(button, merchName, 1);

    // Обновляем счетчик в шапке
    updateCartCounter();

    //Перерисовываем корзину
    await repaintCartSidebar();
}

// Вместо кнопки "В корзину" ставит счетчик
function renderMerchCounter(button, merchName, qty) {

    button.outerHTML = `
        <div
            class="btn-cart-merch merch-counter"
            data-merch-name="${merchName}"
        >
            <button class="minus merch-counter-sign">−</button>
            <span class="quantity">${qty}</span>
            <button class="plus merch-counter-sign">+</button>
        </div>
    `;

    attachCounterEvents(merchName);
}

// Добавляет обработчики событий на '-' и '+' для кнопки мерча
function attachCounterEvents(merchName) {
    const counter = document.querySelector(`[data-merch-name="${merchName}"].merch-counter`);

    counter.querySelector(".plus")
        .addEventListener("click", async () => {
            await changeMerchQuantity(merchName, 1);
        });

    counter.querySelector(".minus")
        .addEventListener("click", async () => {
            await changeMerchQuantity(merchName, -1);
        });
}

// Изменение счетчика при нажатии на кнопку счетчика
async function changeMerchQuantity(merchName, delta) {
    const cart = getCart();

    cart.merch[merchName] += delta;

    if (cart.merch[merchName] <= 0) {
        delete cart.merch[merchName];

        restoreAddButton(merchName);
    } else {
        updateCounterView(merchName, cart.merch[merchName]);
    }

    saveCart(cart);
    updateCartCounter();
    await repaintCartSidebar();
}

// Устанавливает новое количество мерча, которое было дабавлено в карзину
function updateCounterView(merchName, quantity) {
    const counter = document.querySelector(`.merch-counter[data-merch-name="${merchName}"]`);

    if (!counter) {
        return;
    }

    counter.querySelector(".quantity").textContent = quantity;
}

// Заменяет кнопку со счетчиком на кнопку "В корзину"
function restoreAddButton(merchName) {
    const counter = document.querySelector(`.merch-counter[data-merch-name="${merchName}"]`);

    if (!counter) {
        return;
    }

    counter.outerHTML = `
        <button 
            class="btn-cart-merch"
            data-lang="course-button-cart-add"
        >
            ${getCurrentTranslation("course-button-cart-add")}
        </button>
    `;

    const card = document.querySelector(`.card-merch[data-merch-name="${merchName}"]`);

    const button = card.querySelector(".btn-cart-merch");

    button.addEventListener("click", () => {
        addMerch(merchName, button);
    });
}