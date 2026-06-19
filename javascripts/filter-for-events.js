document.addEventListener("DOMContentLoaded", () => {
  const filtersEl = document.getElementById("filters");
  const cards = document.querySelectorAll(".card-event");

  filtersEl.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");

    if (!btn) return;

    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.classList.remove("active");
    });

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});
