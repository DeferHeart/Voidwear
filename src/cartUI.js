import { cartProducts, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "./cart.js";

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector("#cart-count");
const checkoutButton = document.querySelector(".checkout-button");
const cartPanel = document.querySelector("#cart");
const checkoutMenu = document.querySelector(".checkout-menu");
const checkoutForm = document.querySelector("#checkout-form");
const orderMessage = document.querySelector(".order-message");

export function updateCart() {
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;
  let totalQuantity = 0;
  cartProducts.forEach((product, index) => {
    total += product.price * product.quantity;
    totalQuantity += product.quantity;
    const item = document.createElement("div");
    item.className = "cart-item";
    // Text is inserted safely using textContent, not interpolated into HTML.
    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = product.name;
    const price = document.createElement("p");
    price.textContent = (product.price * product.quantity).toFixed(2) + " €";
    const size = document.createElement("p");
    size.textContent = "Size: " + (product.size || "Not selected");
    const controls = document.createElement("div");
    controls.className = "quantity-controls";
    for (const [action, label] of [["minus", "−"], ["quantity", String(product.quantity)], ["plus", "+"]]) {
      const element = document.createElement(action === "quantity" ? "span" : "button");
      element.textContent = label;
      if (action !== "quantity") {
        element.className = action;
        element.dataset.index = String(index);
        element.type = "button";
        element.setAttribute("aria-label", action === "plus" ? "Increase quantity" : "Decrease quantity");
      }
      controls.appendChild(element);
    }
    details.append(name, price, size, controls);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-item";
    remove.dataset.index = String(index);
    remove.textContent = "Remove";
    item.append(details, remove);
    cartItems.appendChild(item);
  });
  if (cartProducts.length === 0) cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  if (cartTotal) cartTotal.textContent = total.toFixed(2) + " €";
  if (cartCount) cartCount.textContent = String(totalQuantity);
  if (checkoutButton) checkoutButton.disabled = cartProducts.length === 0;
}

cartItems?.addEventListener("click", event => {
  const button = event.target.closest("button[data-index]");
  if (!button || !cartItems.contains(button)) return;
  const index = Number(button.dataset.index);
  if (button.matches(".plus")) increaseQuantity(index);
  else if (button.matches(".minus")) decreaseQuantity(index);
  else if (button.matches(".remove-item")) removeFromCart(index);
  else return;
  updateCart();
});

document.querySelector("#cart-button")?.addEventListener("click", () => cartPanel?.classList.add("open"));
document.querySelector("#close-cart")?.addEventListener("click", () => cartPanel?.classList.remove("open"));
document.querySelector(".checkout-button")?.addEventListener("click", () => {
  if (cartProducts.length) checkoutMenu?.classList.add("open");
});
document.querySelector("#close-checkout")?.addEventListener("click", () => checkoutMenu?.classList.remove("open"));
document.querySelector("#clear-cart")?.addEventListener("click", () => { clearCart(); updateCart(); });
checkoutForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!cartProducts.length) return;
  const name = new FormData(checkoutForm).get("name") || "friend";
  document.querySelector("#thanks-name").textContent = "Thanks, " + name + "!";
  clearCart();
  updateCart();
  checkoutForm.reset();
  checkoutMenu?.classList.remove("open");
  cartPanel?.classList.remove("open");
  orderMessage?.classList.add("open");
});
document.querySelector("#close-message")?.addEventListener("click", () => orderMessage?.classList.remove("open"));
