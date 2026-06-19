import { getCurrentTranslation } from "../javascripts/localization.js";

const cards = [
  {
    date: "card.event1.date",
    tag: "card.event1.tag",
    title: "card.event1.title",
    desc: "card.event1.desc",
    seats: "card.event1.seats",
    emoji: "🔥",
  },
  {
    date: "card.event2.date",
    tag: "card.event2.tag",
    title: "card.event2.title",
    desc: "card.event2.desc",
    seats: "card.event2.seats",
    emoji: "🎮",
  },
  {
    date: "card.event3.date",
    tag: "card.event3.tag",
    title: "card.event3.title",
    desc: "card.event3.desc",
    seats: "card.event3.seats",
    emoji: "🤝",
  },
  {
    date: "card.event4.date",
    tag: "card.event4.tag",
    title: "card.event4.title",
    desc: "card.event4.desc",
    seats: "card.event4.seats",
    emoji: "💬",
  },
  {
    date: "card.event5.date",
    tag: "card.event5.tag",
    title: "card.event5.title",
    desc: "card.event5.desc",
    seats: "card.event5.seats",
    emoji: "🎬",
  },
];

const colors = ["#1b3bff", "#ddff00", "#e85000", "#1a2fff", "#ddff00"];

const track = document.getElementById("track");
const wrapper = document.getElementById("cw");

let currentCard = 0;
let autoSlide;
let allCards = [];

const gap = 20;
const copies = 5;
const cardCount = cards.length;

function getCardWidth() {
  if (window.innerWidth <= 600) {
    return 300;
  }
  return 380;
}

function getStep() {
  return getCardWidth() + gap;
}

function getCenterOffset() {
  return (wrapper.clientWidth - getCardWidth()) / 2;
}

function createCard(card) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <div class="card-img">
      <span class="card-date">${getCurrentTranslation(card.date)}</span>
      <span>${card.emoji}</span>
    </div>

    <div class="card-body">
      <div class="card-tag">${getCurrentTranslation(card.tag)}</div>
      <div class="card-title">${getCurrentTranslation(card.title)}</div>
      <div class="card-desc">${getCurrentTranslation(card.desc)}</div>

      <div class="card-footer">
        <span class="card-seats">${getCurrentTranslation(card.seats)}</span>
        <button class="card-btn">${getCurrentTranslation("card.btn")}</button>
      </div>
    </div>
  `;

  return div;
}

function updateSlider(animation = true) {
  const x = getCenterOffset() - currentCard * getStep();

  if (animation) {
    track.style.transition = "transform 0.4s";
  } else {
    track.style.transition = "none";
  }

  track.style.transform = `translateX(${x}px)`;

  updateActiveCard();
}

function updateActiveCard() {
  allCards.forEach((card, index) => {
    const image = card.querySelector(".card-img");
    const button = card.querySelector(".card-btn");
    const tag = card.querySelector(".card-tag");

    if (index === currentCard) {
      const color = colors[index % cardCount];

      image.style.background = color;
      button.style.background = color;
      tag.style.color = color;
      button.style.color = "black";
    } else {
      image.style.background = "#363753";
      button.style.background = "#363753";
      tag.style.color = "#363753";
      button.style.color = "#ccc";
    }
  });
}

function nextCard() {
  currentCard++;
  updateSlider();
}

function prevCard() {
  currentCard--;
  updateSlider();
}

function checkInfinity() {
  const middle = Math.floor(copies / 2) * cardCount;

  if (currentCard < cardCount) {
    currentCard += middle;
    updateSlider(false);
  }

  if (currentCard >= cardCount * (copies - 1)) {
    currentCard -= middle;
    updateSlider(false);
  }
}

track.addEventListener("transitionend", checkInfinity);

function initSlider() {
  track.innerHTML = "";
  allCards = [];

  for (let j = 0; j < copies; j++) {
    for (let i = 0; i < cards.length; i++) {
      const card = createCard(cards[i]);

      track.appendChild(card);
      allCards.push(card);
    }
  }

  currentCard = Math.floor(copies / 2) * cardCount;

  updateSlider(false);
}

function startAutoSlide() {
  autoSlide = setInterval(nextCard, 2800);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

let startX = 0;

wrapper.addEventListener("touchstart", (event) => {
  stopAutoSlide();
  startX = event.touches[0].clientX;
});

wrapper.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0].clientX;
  const distance = endX - startX;

  if (Math.abs(distance) > 40) {
    if (distance < 0) {
      nextCard();
    } else {
      prevCard();
    }
  }

  startAutoSlide();
});

window.addEventListener("resize", () => {
  updateSlider(false);
});

window.refreshSlider = function () {
  stopAutoSlide();
  initSlider();
  startAutoSlide();
};

window._sliderReady = true;

if (window._pendingSliderRefresh) {
  window.refreshSlider();
}
