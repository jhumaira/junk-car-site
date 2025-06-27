<script>
  document.addEventListener('DOMContentLoaded', () => {
    const titleField = document.getElementById('title');
    const vinField = document.getElementById('vinField');
    const lienContainer = document.getElementById('lienContainer');
    const lienField = document.getElementById('lien');
    const lienMessage = document.getElementById('lienMessage');
    const offerAmount = document.getElementById('offerAmount');
    const form = document.querySelector('form');

    if (!titleField || !vinField || !lienField || !lienContainer || !lienMessage || !offerAmount || !form) {
      console.warn('Form logic failed to initialize: missing form elements.');
      return;
    }

    // Set initial offer
    offerAmount.textContent = '$0';

    titleField.addEventListener('change', function () {
      lienMessage.style.display = 'none';
      lienField.value = '';
      offerAmount.textContent = '$0';

      if (this.value === 'yes') {
        vinField.style.display = 'none';
        lienContainer.style.display = 'none';
        offerAmount.textContent = '$325';
      } else if (this.value === 'no') {
        vinField.style.display = 'block';
        lienContainer.style.display = 'block';
        offerAmount.textContent = '$200';
      } else {
        vinField.style.display = 'none';
        lienContainer.style.display = 'none';
      }
    });

    lienField.addEventListener('change', function () {
      if (titleField.value === 'no') {
        if (this.value === 'yes') {
          lienMessage.style.display = 'block';
          offerAmount.textContent = '$0';
        } else if (this.value === 'no') {
          lienMessage.style.display = 'none';
          offerAmount.textContent = '$200';
        }
      }
    });

    form.addEventListener('submit', function (e) {
      if (titleField.value === 'no' && lienField.value === 'yes') {
        e.preventDefault();
        alert('We do not purchase vehicles with active liens.');
      }
    });
  });
</script>
