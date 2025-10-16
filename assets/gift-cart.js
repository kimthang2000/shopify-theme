document.addEventListener('DOMContentLoaded', async () => {
  const threshold = window.theme.settings.cart_threshold_amount;
  const variantId = window.theme.settings.id;

  if (!threshold || !variantId) return;

  function showRandomMessage() {
    const msgEl = document.querySelector('#random-message');
    if (!msgEl) return;

    const messages = msgEl.dataset.messages.split(',');
    const random = messages[Math.floor(Math.random() * messages.length)].trim();

    msgEl.textContent = random;
    console.log('💬 Random message shown:', random);
  }

  async function reloadRandomMessage() {
    try {
      const url = `/?section_id=random-message&ts=${Date.now()}`;

      console.log("url", url)
      const html = await fetch(url).then(r => r.text());

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newSection = doc.querySelector('#random-message-section');
      const oldSection = document.querySelector('#random-message-section');

      if (oldSection && newSection) {
        oldSection.replaceWith(newSection);
        console.log('Random message updated!');
      }
    } catch (e) {
      console.error('Error reloading message:', e);
    }
  }


  async function getCart() {
    const res = await fetch('/cart.js');
    return res.json();
  }

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
      await reloadRandomMessage();
    }
  }

  await checkAndAddGift();
});



