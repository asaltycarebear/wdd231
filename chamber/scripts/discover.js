import { items } from "../data/items.mjs";

const grid = document.querySelector("#cards-grid");

function createCard(item, index) {
  const areaClass = `c${index + 1}`;

  const card = document.createElement("article");
  card.className = `card ${areaClass}`;
  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name} photo" width="300" height="200" loading="lazy">
      <figcaption>${item.name}</figcaption>
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button class="learn-more" type="button" aria-label="Learn more about ${item.name}">Learn more</button>
  `;
  return card;
}

items.forEach((it, i) => grid.appendChild(createCard(it, i)));

const visitMessageEl = document.querySelector("#visit-message");
const LAST_VISIT_KEY = "discover_last_visit";

function showVisitMessage() {
  const now = Date.now();
  const last = Number(localStorage.getItem(LAST_VISIT_KEY));

  if (!last || Number.isNaN(last)) {
    visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((now - last) / msPerDay);

    if (diffDays < 1) {
      visitMessageEl.textContent = "Back so soon? Awesome!";
    } else if (diffDays === 1) {
      visitMessageEl.textContent = "You last visited 1 day ago.";
    } else {
      visitMessageEl.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  localStorage.setItem(LAST_VISIT_KEY, String(now));
}

showVisitMessage();
