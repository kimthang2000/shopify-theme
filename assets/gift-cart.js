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

  async function getCart() {
    const res = await fetch('/cart.js');
    return res.json();
  }

  // Hàm thêm sản phẩm vào cart
  async function addGiftToCart(variantId) {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
    });
  }

  async function checkAndAddGift() {
    const cart = await getCart();
    const total = cart.total_price / 100;
    const hasGift = cart.items.some(item => item.handle === giftHandle);

    if (total >= threshold && !hasGift) {
      console.log('🎁 Adding free gift...');
      await addGiftToCart(giftVariantId);
      await reloadRandomMessage(); // cập nhật message
      await updateCartUI();        // cập nhật UI (nếu có drawer)
    } else if (total < threshold && hasGift) {
      console.log('🗑️ Removing free gift...');
      const giftItem = cart.items.find(i => i.handle === giftHandle);
      await fetch(`/cart/change.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: giftItem.key, quantity: 0 })
      });
      await reloadRandomMessage();
      await updateCartUI();
    }
  }

  // Cập nhật UI sau mỗi lần thay đổi cart
  async function updateCartUI() {
    const html = await fetch('/?section_id=cart-drawer').then(r => r.text());
    const newCart = new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector('#CartDrawer');
    const oldCart = document.querySelector('#CartDrawer');
    if (oldCart && newCart) oldCart.replaceWith(newCart);
  }

  // Lắng nghe event add-to-cart (tùy theme)
  document.addEventListener('cart:updated', checkAndAddGift);
  await checkAndAddGift();
});



