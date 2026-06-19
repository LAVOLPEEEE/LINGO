// Добавляет поведение к кнопкам "В корзину" для курсов и меняет стиль, если курсы уже были добавлены в корзину
function initCourseCartButtons(cart) {
    document.querySelectorAll(".btn-cart").forEach((button) => {
        const card = button.closest(".card-course");

        const courseName = card.dataset.courseName;

        if (cart.courses.includes(courseName)) {
            button.classList.add("button-in-cart");

            button.textContent = getCurrentTranslation("course-button-cart-in");
        }

        button.addEventListener("click",  async () => {
            await toggleCourseCart(courseName, button);
        });
    });
}

// Вызывается при нажатии на кнопку "В корзину"
async function toggleCourseCart(courseName, button) {
    let cart = getCart();

    const exists = cart.courses.includes(courseName);

    if (exists) {
        cart.courses = cart.courses.filter((name) => name !== courseName);

        button.classList.remove("button-in-cart");
        button.textContent = getCurrentTranslation("course-button-cart-add");
    } else {
        cart.courses.push(courseName);

        button.classList.add("button-in-cart");
        button.textContent = getCurrentTranslation("course-button-cart-in");
    }

    saveCart(cart);
    updateCartCounter();
    await repaintCartSidebar();
}

// Обновляется перевод кнопки "В корзину"
function updateCourseCartTexts() {
    const cart = getCart();

    document.querySelectorAll(".btn-cart").forEach((button) => {
        const card = button.closest(".card-course");

        const courseName = card.dataset.courseName;

        button.textContent = cart.courses.includes(courseName)
            ? getCurrentTranslation("course-button-cart-in")
            : getCurrentTranslation("course-button-cart-add");
    });
}