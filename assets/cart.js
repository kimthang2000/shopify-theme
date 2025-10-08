document.addEventListener('DOMContentLoaded', function() {
  const IAgreecheckbox = document.getElementById('i_agree_checkbox');
  const checkoutButton = document.getElementById('checkout_button');

  checkoutButton.disabled = true;

  IAgreecheckbox.addEventListener('change', function() {
    checkoutButton.disabled = !this.checked;
  });
});
