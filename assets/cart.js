document.addEventListener('DOMContentLoaded', function() {
  const IAgreecheckbox = document.getElementById('i_agree_checkbox');

  if (IAgreecheckbox) {
    IAgreecheckbox.addEventListener('change', function() {
      IAgreecheckbox.value = !!submitCheckout.disabled;
      console.log('IAgreecheckbox.value', IAgreecheckbox.value)
    });

  }
});
