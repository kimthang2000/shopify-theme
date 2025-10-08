document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const variantId = window.theme.settings.id;
  if (!threshold || !variantId) return;

  // async function reloadRandomMessage() {
  //   try {
  //     const res = await fetch(window.location.pathname + '?section_id=random-message');
  //     if (!res.ok) return;
  //     const html = await res.text();

  //     const tempDiv = document.createElement('div');
  //     tempDiv.innerHTML = html;

  //     const newSection = tempDiv.querySelector('#RandomMessageSection');
  //     const currentSection = document.querySelector('#RandomMessageSection');
  //     if (newSection && currentSection) {
  //       currentSection.replaceWith(newSection);
  //       console.log('✨ Random message updated!');
  //     }
  //   } catch (err) {
  //     console.error('Error reloading message:', err);
  //   }
  // }

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
        // await reloadRandomMessage();
        window.location.reload();
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
