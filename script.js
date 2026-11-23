const searchInput = document.getElementById("searchInput");
const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const toast = document.getElementById("toast");
let selectedCategory = "All";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  productCards.forEach(card => {
    const matchesCategory = selectedCategory === "All" || card.dataset.category === selectedCategory;
    const matchesSearch = card.dataset.name.toLowerCase().includes(searchTerm);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  document.getElementById("emptyMessage").hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProducts);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    filterProducts();
  });
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    filterButtons.forEach(item => item.classList.toggle("active", item.dataset.filter === selectedCategory));
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    filterProducts();
  });
});

document.querySelectorAll(".view-button").forEach(button => {
  button.addEventListener("click", () => showToast(button.dataset.product + " selected. This is a demo listing."));
});

document.getElementById("sellForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value;
  const category = document.getElementById("itemCategory").value;
  if (!name || !price || !category) {
    showToast("Please complete all fields.");
    return;
  }

  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.category = category;
  card.dataset.name = name.toLowerCase();
  const emojiByCategory = { Electronics: "🔌", Clothing: "👚", Books: "📖", Furniture: "🪴" };
  card.innerHTML = `
    <div class="product-image product-green">
      <span class="product-emoji">${emojiByCategory[category]}</span>
      <span class="condition">New listing</span>
    </div>
    <div class="product-info">
      <span class="product-category">${category}</span>
      <h3></h3>
      <div class="product-bottom"><strong></strong><button class="view-button" type="button">View item ↗</button></div>
    </div>`;
  card.querySelector("h3").textContent = name;
  card.querySelector(".product-bottom strong").textContent = "Rs. " + Number(price).toLocaleString("en-PK");
  card.querySelector(".view-button").addEventListener("click", () => showToast(name + " selected. This is a demo listing."));
  document.getElementById("productGrid").prepend(card);
  event.target.reset();
  selectedCategory = "All";
  filterButtons.forEach(item => item.classList.toggle("active", item.dataset.filter === "All"));
  searchInput.value = "";
  filterProducts();
  showToast("Your demo listing has been added!");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
