document.addEventListener('DOMContentLoaded', function() {
  const IAgreecheckbox = document.getElementById('i_agree_checkbox');
  const checkoutButton = document.getElementById('checkout_button');
  const hiddenInput = document.getElementById('i_agree_hidden');

  checkoutButton.disabled = true;

  IAgreecheckbox.addEventListener('change', function() {
    checkoutButton.disabled = !this.checked;
    hiddenInput.value = this.checked ? 'true' : 'false';
  });
});
