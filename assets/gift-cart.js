document.addEventListener('DOMContentLoaded', function() {
  const threshold = parseFloat(window.theme.settings.cart_threshold_amount);
  const giftVariant = parseInt(window.theme.settings.id);

  let formData = {
  'items': [{
    'id': giftVariant,
    'quantity': 1
    }]
  };

  if (giftVariant)

  fetch('cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
}