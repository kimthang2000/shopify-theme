
document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const productId = window.theme.settings.id;

  if (!threshold || !productId) return;

  console.log("productId", productId)

  // return;

  async function fetchCart() {
    const res = await fetch('/cart.js');
    return res.json();
  }

  async function updateGift(cart) {
    const subtotal = cart.items_subtotal_price / 100;

    // if (subtotal >= threshold) {
    //   await fetch('/cart/add.js', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ id: productId, quantity: 1 })
    //   });
    //   triggerMessageReload();
    // }
  }

  function triggerMessageReload() {
    document.dispatchEvent(new CustomEvent('gift-updated'));
  }

  const cart = await fetchCart();
  updateGift(cart);

  async function getVariantIdFromHandle(handle) {
    const res = await fetch(`/products/${handle}.js`);
    const product = await res.json();
    return product.variants[0].id; // lấy variant đầu tiên
  }
});


