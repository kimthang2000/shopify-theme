document.addEventListener("DOMContentLoaded", () => {
  const threshold = parseFloat(window.theme.settings.cart_threshold_amount);
  const giftProductId = window.theme.settings.id;

  if (!threshold || !giftProductId) return;

  function updateGift(cart) {
    const total = cart.total_price / 100; // Shopify prices in cents
    const hasGift = cart.items.some(i => i.id == giftProductId);

    console.log('giftProductId', giftProductId, threshold);

     fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: giftProductId, quantity: 1 })
      }).then(() => location.reload());


    // if (total >= threshold && !hasGift) {
    //   fetch('/cart/add.js', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ id: giftProductId, quantity: 1 })
    //   }).then(() => location.reload());
    // } else if (total < threshold && hasGift) {
    //   fetch('/cart/change.js', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ id: giftProductId, quantity: 0 })
    //   }).then(() => location.reload());
    // }
  }

  fetch('/cart.js')
    .then(res => res.json())
    .then(updateGift);
});
