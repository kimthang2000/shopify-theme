document.addEventListener('DOMContentLoaded', function() {
  const IAgreecheckbox = document.getElementById('i_agree_checkbox');
  const submitCheckout = document.getElementById('submit_checkout_button');
  console.log('submitCheckout', submitCheckout)
  submitCheckout.disabled = true;
  

  IAgreecheckbox.addEventListener('change', function() {
    submitCheckout.disabled = !this.checked;
  });
});
