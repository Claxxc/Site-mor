const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function makeStars() {
  const container = $("#stars");
  for (let i = 0; i < 65; i++) {
    const star = document.createElement("span");
    star.className = "star-dot";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.opacity = `${0.2 + Math.random() * 0.6}`;
    container.appendChild(star);
  }
}
makeStars();

$("#open-envelope").addEventListener("click", () => {
  const button = $("#open-envelope");
  button.classList.add("opening");
  button.disabled = true;
  window.setTimeout(() => {
    $("#intro").classList.add("hidden");
    $("#site").classList.remove("hidden");
    document.body.classList.add("entered");
    observeReveals();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 850);
});

function observeReveals() {
  const elements = $$(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}

const modal = $("#letter-modal");
$("#read-letter").addEventListener("click", () => {
  modal.classList.remove("hidden");
  $("#close-letter").focus();
});
function closeModal() { modal.classList.add("hidden"); }
$("#close-letter").addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target.dataset.close === "true") closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

$$(".reason-card").forEach(card => {
  card.addEventListener("click", () => {
    const isFlipped = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(isFlipped));
  });
});

$("#secret-button").addEventListener("click", () => {
  const message = $("#secret-message");
  message.classList.toggle("hidden");
  $("#secret-button").innerHTML = message.classList.contains("hidden")
    ? 'tem mais uma coisinha <span>✦</span>'
    : 'guardar segredo <span>♡</span>';
});

observeReveals();
