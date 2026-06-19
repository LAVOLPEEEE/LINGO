const eventsData = {
  1: {
    title: "modal.event1.title",
    badge: "modal.event1.badge",
    color: "blue-card",
    date: "modal.event1.date",
    time: "modal.event1.time",
    loc: "modal.event1.loc",
    level: "modal.event1.level",
    desc: "modal.event1.desc",
  },

  2: {
    title: "modal.event2.title",
    badge: "modal.event2.badge",
    color: "green",
    date: "modal.event2.date",
    time: "modal.event2.time",
    loc: "modal.event2.loc",
    level: "modal.event2.level",
    desc: "modal.event2.desc",
  },

  3: {
    title: "modal.event3.title",
    badge: "modal.event3.badge",
    color: "blue-card",
    date: "modal.event3.date",
    time: "modal.event3.time",
    loc: "modal.event3.loc",
    level: "modal.event3.level",
    desc: "modal.event3.desc",
  },

  4: {
    title: "modal.event4.title",
    badge: "modal.event4.badge",
    color: "blue-card",
    date: "modal.event4.date",
    time: "modal.event4.time",
    loc: "modal.event4.loc",
    level: "modal.event4.level",
    desc: "modal.event4.desc",
  },

  5: {
    title: "modal.event5.title",
    badge: "modal.event5.badge",
    color: "green",
    date: "modal.event5.date",
    time: "modal.event5.time",
    loc: "modal.event5.loc",
    level: "modal.event5.level",
    desc: "modal.event5.desc",
  },

  6: {
    title: "modal.event6.title",
    badge: "modal.event6.badge",
    color: "blue-card",
    date: "modal.event6.date",
    time: "modal.event6.time",
    loc: "modal.event6.loc",
    level: "modal.event6.level",
    desc: "modal.event6.desc",
  },
};

let currentEventId = null;

const overlay = document.getElementById("overlay");
const windowClose = document.getElementById("windowClose");
const windowCloseBtn = document.getElementById("windowCloseBtn");

function tr(key) {
  return window.currentTranslations?.[key] || key;
}

function openWindow(id) {
  currentEventId = id;

  const e = eventsData[id];
  if (!e) return;

  document.getElementById("windowTitle").textContent = tr(e.title);
  document.getElementById("windowDate").textContent = tr(e.date);
  document.getElementById("windowTime").textContent = tr(e.time);
  document.getElementById("windowLoc").textContent = tr(e.loc);
  document.getElementById("windowLevel").textContent = tr(e.level);
  document.getElementById("windowDesc").textContent = tr(e.desc);

  const badge = document.getElementById("windowBadge");
  badge.textContent = tr(e.badge);
  badge.className = "window-badge " + e.color;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  windowClose.focus();
}

window.refreshOpenedModal = function () {
  if (currentEventId && overlay.classList.contains("open")) {
    openWindow(currentEventId);
  }
};

function closeWindow() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-id]").forEach((el) => {
  el.addEventListener("click", () => openWindow(el.dataset.id));

  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openWindow(el.dataset.id);
    }
  });
});

windowClose.addEventListener("click", closeWindow);
windowCloseBtn.addEventListener("click", closeWindow);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeWindow();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeWindow();
  }
});
