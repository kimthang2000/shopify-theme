
document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const variantId = window.theme.settings.id;

  if (!threshold || !variantId) return;

  async function reloadRandomMessage() {
    const res = await fetch(window.location.pathname + '?section_id=random-message');
    const html = await res.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const newSection = tempDiv.querySelector('#RandomMessageSection');
    const currentSection = document.querySelector('#RandomMessageSection');

    if (newSection && currentSection) {
      currentSection.replaceWith(newSection);
      console.log('✨ Random message updated!');
    }
  }

  async function fetchCart() {
    const res = await fetch('/cart.js');
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
     
      if (res.status === 200) {
        window.location.reload();
        await reloadRandomMessage()
      }
    }
  }

  const cart = await fetchCart();
  updateGift(cart);
});


