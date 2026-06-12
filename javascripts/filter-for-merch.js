const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card-merch");
const grid = document.getElementById("grid2");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    let visible = 0;

    cards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    const existing = grid.querySelector(".empty-state");
    if (existing) existing.remove();
    if (visible === 0) {
      const msg = document.createElement("div");
      msg.className = "empty-state";
      msg.textContent = "Нет товаров в этой категории";
      grid.appendChild(msg);
    }
  });
});
