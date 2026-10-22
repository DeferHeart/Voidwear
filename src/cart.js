const STORAGE_KEY = "voidwear-cart";
function loadCart() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
export let cartProducts = loadCart();
export function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartProducts));
}
export function clearCart() {
  cartProducts = [];
  saveCart();
}
export function addToCart(product) {
  const existing = cartProducts.find(item => item.id === product.id && item.size === product.size);
  if (existing) existing.quantity += product.quantity || 1;
  else cartProducts.push({ ...product, quantity: product.quantity || 1 });
  saveCart();
}
export function removeFromCart(index) {
  if (index < 0 || index >= cartProducts.length) return;
  cartProducts.splice(index, 1);
  saveCart();
}
export function increaseQuantity(index) {
  if (!cartProducts[index]) return;
  cartProducts[index].quantity++;
  saveCart();
}
export function decreaseQuantity(index) {
  if (!cartProducts[index]) return;
  cartProducts[index].quantity--;
  if (cartProducts[index].quantity <= 0) removeFromCart(index);
  else saveCart();
}
