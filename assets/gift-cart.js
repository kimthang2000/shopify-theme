
document.addEventListener('DOMContentLoaded', async () => {
  let addToCartForm = document.querySelector('form[action$="/cart/add"]');
    console.log("addToCartForm", addToCartForm)
  let formData = new FormData(addToCartForm);


  console.log("formData", formData)

  // fetch(window.Shopify.routes.root + 'cart/add.js', {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(response => {
  //   return response.json();
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });


  // const threshold = window.theme.settings.cart_threshold_amount;
  // const productId = window.theme.settings.id;

  // if (!threshold || !productId) return;

  // async function fetchCart() {
  //   const res = await fetch('/cart.js');
  //   return res.json();
  // }

  // async function updateGift(cart) {
  //   const subtotal = cart.items_subtotal_price / 100;

  //   if (subtotal >= threshold) {
  //     await fetch('/cart/add.js', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ id: productId, quantity: 1 })
  //     });
  //     triggerMessageReload();
  //   }
  // }

  // function triggerMessageReload() {
  //   document.dispatchEvent(new CustomEvent('gift-updated'));
  // }

  // const cart = await fetchCart();
  // updateGift(cart);
});
