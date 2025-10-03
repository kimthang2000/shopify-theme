document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('i_agree_checkbox');
  const checkoutButton = document.getElementById('checkout_button');
  const hiddenInput = document.getElementById('i_agree_hidden');

  // Disable button ban đầu
  checkoutButton.disabled = true;

  checkbox.addEventListener('change', function() {
    checkoutButton.disabled = !this.checked;
    hiddenInput.value = this.checked ? 'true' : 'false';
  });
});
