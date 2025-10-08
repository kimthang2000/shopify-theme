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


document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/customer/privacy/location.json');
    console('res', res)
    const data = await res.json();

    if (data.state === 'OR' && data.country === 'US') {
      // Tạo popup
      const popup = document.createElement('div');
      popup.id = 'oregon-popup';
      popup.style.position = 'fixed';
      popup.style.top = '0';
      popup.style.left = '0';
      popup.style.width = '100%';
      popup.style.height = '100%';
      popup.style.background = 'rgba(0,0,0,0.5)';
      popup.style.display = 'flex';
      popup.style.alignItems = 'center';
      popup.style.justifyContent = 'center';
      popup.style.zIndex = '9999';

      popup.innerHTML = `
        <div style="background:white; padding:20px; border-radius:8px; text-align:center;">
          <p>Welcome Oregon customer!</p>
          <button id="close-popup">Close</button>
        </div>
      `;

      document.body.appendChild(popup);

      document.getElementById('close-popup').addEventListener('click', () => {
        popup.remove();
      });
    }
  } catch (err) {
    console.error('Failed to fetch customer location:', err);
  }
});

