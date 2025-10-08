
document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const variant = window.theme.settings.id;

  if (!threshold || !variant) return;

  console.log("productId", variant)

  // return;

  async function fetchCart() {
    const res = await fetch('/cart.js');
    return res.json();
  }

  async function updateGift(cart) {
    const subtotal = cart.items_subtotal_price / 100;
    if (subtotal >= threshold) {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variant, quantity: 1 })
      });
     
      if (res.status === 200) {
        window.location.reload();
      }
    }
  }

  const cart = await fetchCart();
  updateGift(cart);
});


