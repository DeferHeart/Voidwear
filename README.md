# VOIDWEAR

A fictional dark streetwear storefront built with vanilla HTML, CSS and JavaScript. Reconstructed from our front-end learning project; visual design is a new interpretation, not a copy of the original.

## Features
- Product catalog and individual product pages
- Size selection (XS–XL)
- Shared shopping cart with quantity controls and removal
- Persistent cart using localStorage (`voidwear-cart`)
- Empty-cart state and disabled checkout
- Demo checkout with confirmation (no payment processing)
- Responsive layout and ES modules

## Run locally
Open the repository folder using VS Code **Live Server**, then visit `main/index.html`. ES module imports require an HTTP server; opening the HTML directly with `file://` may not work.

## Project structure
- `main/` — storefront homepage, styles, and interactions
- `product/` — product detail page
- `src/products.js` — product data
- `src/cart.js` — cart state and localStorage
- `src/cartUI.js` — shared cart rendering, delegated events, demo checkout

This is a portfolio/demo project. No orders are transmitted to a server.
