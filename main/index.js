import { products } from "../src/products.js";
import { addToCart } from "../src/cart.js";
import { updateCart } from "../src/cartUI.js";

const grid = document.querySelector("#product-grid");
for (const product of products) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = product.id;
  card.innerHTML = '<div class="product-art"><span class="art-symbol"></span></div><div class="product-meta"><div><small></small><h3></h3><p></p></div><button class="add-button" type="button" aria-label="Add to cart">+</button></div>';
  card.querySelector(".product-art").style.setProperty("--art", product.color);
  card.querySelector(".art-symbol").textContent = product.symbol;
  card.querySelector("small").textContent = product.category;
  card.querySelector("h3").textContent = product.name;
  card.querySelector("p").textContent = product.price.toFixed(2) + " €";
  grid.appendChild(card);
}
grid.addEventListener("click", event => {
  const card = event.target.closest(".product-card");
  if (!card) return;
  const product = products.find(item => item.id === card.dataset.id);
  if (!product) return;
  if (event.target.closest(".add-button")) {
    addToCart({ id: product.id, name: product.name, price: product.price, size: null, quantity: 1 });
    updateCart();
    document.querySelector("#cart").classList.add("open");
  } else {
    window.location.href = "../product/product.html?id=" + encodeURIComponent(product.id);
  }
});
updateCart();
