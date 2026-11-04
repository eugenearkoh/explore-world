const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

const searchInput = document.getElementById("destinationSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".destination-card");
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function filterDestinations() {
  const term = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  cards.forEach(card => {
    const matchesRegion = activeFilter === "all" || card.dataset.region === activeFilter;
    const matchesSearch = card.dataset.name.toLowerCase().includes(term) || card.textContent.toLowerCase().includes(term);
    const show = matchesRegion && matchesSearch;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterDestinations();
  });
});
searchInput.addEventListener("input", filterDestinations);

document.querySelectorAll(".save-btn").forEach(button => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));
  });
});

document.querySelectorAll(".book-link").forEach(link => {
  link.addEventListener("click", () => {
    const placeSelect = document.getElementById("place");
    const destination = link.dataset.place;
    const matchingOption = [...placeSelect.options].find(option => option.text === destination);
    if (matchingOption) placeSelect.value = matchingOption.value;
  });
});

document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const place = document.getElementById("place").value;
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Travel enquiry: ${place}`);
  const body = encodeURIComponent(
    `Hello ExploreWorld,\n\nI would like to make a travel enquiry.\n\nName: ${name}\nEmail: ${email}\nDestination: ${place}\n\nTrip details:\n${message || "Not provided"}\n\nPlease contact me with more information about availability and final pricing.`
  );
  document.getElementById("formStatus").textContent = "Opening your email app to prepare the enquiry…";
  window.location.href = `mailto:hello@exploreworld.example?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
