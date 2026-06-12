const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");
const cards = document.querySelectorAll(".card-course");

filtersEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-btn");

  if (!btn) {
    return;
  }

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.remove("active");
  });

  btn.classList.add("active");

  const filter = btn.dataset.filter;
  let anyVisible = false;

  cards.forEach((card) => {
    const match = filter === "all" || card.dataset.category === filter;

    if (match) {
      card.classList.remove("hidden");
      anyVisible = true;
    } else {
      card.classList.add("hidden");
    }
  });

  const noResults = gridEl.querySelector(".no-results");

  if (!anyVisible) {
    if (!noResults) {
      const div = document.createElement("div");

      div.className = "no-results";
      div.textContent = "Курсы не найдены";

      gridEl.appendChild(div);
    }
  } else if (noResults) {
    noResults.remove();
  }
});
