async function getCart() {
  const res = await fetch('/cart.js');
  return await res.json();
}

async function addGiftToCart(variantId) {
  const data = {
    'items': [
      {
        'id': variantId,
        'quantity': 1
      }
    ]
  }

  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  console.log('res', res);
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

async function checkGiftStatus() {
  const threshold = parseFloat(window.theme.settings.cart_threshold_amount);
  const giftVariant = parseInt(window.theme.settings.id);
  if (!threshold || !giftVariant) return;

  const cart = await getCart();
  const total = cart.total_price / 100;
  const hasGift = cart.items.some(i => i.product_id === giftVariant);
  console.log("cart", cart, giftVariant)
  if (total >= threshold && !hasGift) {
    console.log("🎁 Add gift");
    await addGiftToCart(giftVariant);
  } else if (total < threshold && hasGift) {
    console.log("🗑️ Remove gift");
    await removeGiftFromCart(giftVariant);
  }
}

// --------- INIT ---------
document.addEventListener('DOMContentLoaded', async () => {
  await checkGiftStatus();
});

// --------- HANDLE AJAX UPDATES ---------
document.addEventListener('cart:updated', async () => {
  await checkGiftStatus();
});
