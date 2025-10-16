document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const variantId = window.theme.settings.id;

  if (!threshold || !variantId) return;

  async function reloadRandomMessage() {
    const sectionUrl = '/?section_id=random-message';
    const html = await fetch(sectionUrl).then(r => r.text());
    console.log('html', html);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newSection = doc.querySelector('#random-message-section');
    const oldSection = document.querySelector('#random-message-section');
    console.log('text', newSection, oldSection, doc);

    if (oldSection && newSection) {
      oldSection.replaceWith(newSection);
    }
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

    const subtotal = cart.items_subtotal_price / 100;
    const hasGift = cart.items.some(item => item.id === variantId);

    if (subtotal >= threshold && !hasGift) {
      await addGiftToCart(variantId);
      await reloadRandomMessage(); // cập nhật message
    }
  }

  await checkAndAddGift();
});



