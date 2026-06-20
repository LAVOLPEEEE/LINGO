document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("sidemenu.html");
    const html = await response.text();

    document.body.insertAdjacentHTML("beforeend", html);

    initSideMenu();
    setActiveMenuItem();
});

function initSideMenu() {
    const sideMenuButton = document.querySelector(".hamburger");
    const closeSideMenuButton = document.querySelector(".close-side-menu-btn");
    const sideMenu = document.querySelector(".side-menu-container");

    sideMenuButton.addEventListener("click", () => {
        sideMenu.classList.remove("hidden");
    });

    closeSideMenuButton.addEventListener("click", () => {
        sideMenu.classList.add("hidden");
    });
}

function setActiveMenuItem() {
    const currentPage = document.body.dataset.page;

    if (!currentPage) return;

    document.querySelectorAll(".side-menu-nav a").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === currentPage
        );
    });
}