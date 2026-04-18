# Checkout Page Plan

Source: Cursor plan `checkout_page_plan_89886dc1` (snapshot for the repo).

## Goal

Build a clean, basic checkout page UI for Lisa.clo that matches the existing tan/brown/off-white design system. Frontend-only for now:

- Customer details fields
- Shipping/address fields
- Order summary sidebar
- Place order button

No payment integration, no backend wiring in this phase.

## Files involved

- `src/App.jsx` — `/checkout` route
- `src/components/Cart.jsx` — navigate to checkout
- `src/components/cart.css`
- `src/components/Checkout.jsx`
- `src/components/checkout.css`

## Validation checklist

- `/checkout` route opens correctly.
- Cart checkout button leads to checkout.
- Checkout matches existing look and feel.
- Layout works on desktop and mobile.
- No payment or backend dependency for the page itself.
