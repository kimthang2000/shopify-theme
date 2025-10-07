async function getCart() {
  const res = await fetch('/cart.js');
  return await res.json();
}

async function addGiftToCart(variantId) {
  await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: variantId, quantity: 1 })
  });
}

async function removeGiftFromCart(variantId) {
  const cart = await getCart();
  const item = cart.items.find(i => i.variant_id === variantId);
  if (item) {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.key, quantity: 0 })
    });
  }
}

async function handleGift() {
  const threshold = parseFloat(window.theme.settings.cart_threshold_amount);
  const giftVariant = parseInt(window.theme.settings.id);
return;
  if (!threshold || !giftVariant) return;

  const cart = await getCart();
  const total = cart.total_price / 100;
  const hasGift = cart.items.some(i => i.variant_id === giftVariant);

  if (total >= threshold && !hasGift) {
    await addGiftToCart(giftVariant);
    location.reload();
  } else if (total < threshold && hasGift) {
    await removeGiftFromCart(giftVariant);
    location.reload();
  }
}

// Run when cart is loaded
document.addEventListener('DOMContentLoaded', handleGift);
