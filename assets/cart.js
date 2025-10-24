document.addEventListener('DOMContentLoaded', function() {
  const IAgreecheckbox = document.getElementById('i_agree_checkbox');
  const submitCheckout = document.getElementById('submit_checkout_button');

  if (IAgreecheckbox) {
    IAgreecheckbox.addEventListener('change', function() {
      IAgreecheckbox.value = !!submitCheckout.disabled;
      console.log('IAgreecheckbox.value', IAgreecheckbox.value)
    });

  }
});
