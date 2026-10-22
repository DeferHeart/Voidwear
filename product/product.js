import { getProduct } from "../src/products.js";
import { addToCart } from "../src/cart.js";
import { updateCart } from "../src/cartUI.js";

const id = new URLSearchParams(location.search).get("id");
const product = getProduct(id);
const details = document.querySelector("#product-details");
let selectedSize = null;
if (!product) {
  details.innerHTML = '<div class="not-found"><h1>Product not found</h1><a href="../main/index.html">Back to shop</a></div>';
} else {
  document.title = product.name + " — VOIDWEAR";
  details.innerHTML = '<div class="detail-art"><span></span></div><div class="detail-info"><p class="eyebrow"></p><h1></h1><p class="detail-price"></p><p class="detail-description"></p><p class="size-label">SELECT SIZE</p><div class="size-options"></div><button type="button" class="primary-button to-cart">ADD TO CART ↗</button><p class="add-message" role="status"></p></div>';
  details.querySelector(".detail-art").style.setProperty("--art", product.color);
  details.querySelector(".detail-art span").textContent = product.symbol;
  details.querySelector(".eyebrow").textContent = product.category;
  details.querySelector("h1").textContent = product.name;
  details.querySelector(".detail-price").textContent = product.price.toFixed(2) + " €";
  details.querySelector(".detail-description").textContent = product.description;
  const options = details.querySelector(".size-options");
  for (const size of ["XS", "S", "M", "L", "XL"]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "size-button";
    button.dataset.size = size;
    button.textContent = size;
    options.appendChild(button);
  }
  options.addEventListener("click", event => {
    const button = event.target.closest(".size-button");
    if (!button) return;
    selectedSize = button.dataset.size;
    options.querySelectorAll(".size-button").forEach(el => el.classList.toggle("active", el === button));
    details.querySelector(".add-message").textContent = "";
  });
  details.querySelector(".to-cart").addEventListener("click", () => {
    if (!selectedSize) {
      details.querySelector(".add-message").textContent = "Please select a size first.";
      return;
    }
    addToCart({ id: product.id, name: product.name, price: product.price, size: selectedSize, quantity: 1 });
    updateCart();
    details.querySelector(".add-message").textContent = "Added to cart!";
    document.querySelector("#cart").classList.add("open");
  });
}
updateCart();
