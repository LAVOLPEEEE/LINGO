const cards = [
  {
    date: "22.06.26",
    tag: "#EnglishDay",
    title: "English Day в Москве",
    desc: "Целый день только на английском — с лекциями, воркшопами и вечеринкой.",
    seats: "45 мест",
    emoji: "🔥",
  },
  {
    date: "30.06.26",
    tag: "Игры",
    title: "Игры на английском",
    desc: "Квиз, ролевые игры и дебаты — всё на языке, всё весело.",
    seats: "12 мест",
    emoji: "🎮",
  },
  {
    date: "03.07.26",
    tag: "Работа в команде",
    title: "Бизнес-симуляция",
    desc: "Разыгрываем деловые переговоры и презентации — на английском.",
    seats: "8 мест",
    emoji: "🤝",
  },
  {
    date: "15.07.26",
    tag: "Разговорный клуб",
    title: "Speaking Club Online",
    desc: "Живые разговоры на любые темы с носителями и учениками.",
    seats: "20 мест",
    emoji: "💬",
  },
  {
    date: "28.07.26",
    tag: "Кино",
    title: "Кино на английском",
    desc: "Смотрим фильм в оригинале, обсуждаем вместе — без субтитров.",
    seats: "30 мест",
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
      <span class="card-date">${card.date}</span>
      <span>${card.emoji}</span>
    </div>

    <div class="card-body">
      <div class="card-tag">${card.tag}</div>
      <div class="card-title">${card.title}</div>
      <div class="card-desc">${card.desc}</div>

      <div class="card-footer">
        <span class="card-seats">${card.seats}</span>
        <button class="card-btn">Участвовать</button>
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

initSlider();
startAutoSlide();
