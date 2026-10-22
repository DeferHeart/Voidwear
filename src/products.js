export const products = [
  { id: "hoodie", name: "Void Zip Hoodie", price: 79.99, description: "Heavyweight zip hoodie. Built for everyday wear.", category: "Outerwear", color: "#5d5b70", symbol: "VOID" },
  { id: "tee", name: "System Error Tee", price: 39.99, description: "Oversized graphic tee with a minimal print.", category: "T-shirts", color: "#898b86", symbol: "404" },
  { id: "cargo", name: "Terminal Cargo Pants", price: 64.99, description: "Relaxed wide-fit cargos with utility pockets.", category: "Bottoms", color: "#5c675a", symbol: "CTRL" }
];
export const getProduct = id => products.find(product => product.id === id);
