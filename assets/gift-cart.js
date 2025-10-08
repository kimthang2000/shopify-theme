const messages = [
  "Congrats!",
  "You got a gift!",
  "Enjoy your shopping!"
];

document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const variantId = window.theme.settings.id;

  if (!threshold || !variantId) return;

  function showRandomMessage() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const section = document.getElementById('random-message-section');
    const p = document.getElementById('random-message');

    if (section && p) {
      p.textContent = msg;
      section.style.display = 'block'; // show section
    }
  }

  async function fetchCart() {
    const res = await fetch('/cart.js');
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  }

  async function updateGift(cart) {
    const subtotal = cart.items_subtotal_price / 100;
    const hasGift = cart.items.some(item => item.id === variantId);

    if (subtotal >= threshold && !hasGift) {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });

      if (res.ok) {
        console.log('🎁 Gift added successfully!');
        window.location.reload();
        showRandomMessage();
      }
    }
  }

  try {
    const cart = await fetchCart();
    await updateGift(cart);
  } catch (err) {
    console.error('Cart update error:', err);
  }
});
