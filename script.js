<script>
  const titleField = document.getElementById('title');
  const vinField = document.getElementById('vinField');
  const lienContainer = document.getElementById('lienContainer');
  const lienField = document.getElementById('lien');
  const lienMessage = document.getElementById('lienMessage');
  const offerAmount = document.getElementById('offerAmount');
  const form = document.getElementById('junkForm');

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
    } else {
      vinField.style.display = 'none';
      lienContainer.style.display = 'none';
    }
  });

  lienField.addEventListener('change', function () {
    if (this.value === 'yes') {
      offerAmount.textContent = '$0';
      lienMessage.style.display = 'block';
    } else if (this.value === 'no') {
      lienMessage.style.display = 'none';
      offerAmount.textContent = '$200';
    } else {
      lienMessage.style.display = 'none';
      offerAmount.textContent = '$0';
    }
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (titleField.value === 'no' && lienField.value === 'yes') {
      alert('We do not purchase vehicles with active liens.');
      return;
    }

    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      year: formData.get('year'),
      make: formData.get('make'),
      model: formData.get('model'),
      title: formData.get('title'),
      vin: formData.get('vin'),
      lien: formData.get('lien'),
      offer:
        formData.get('title') === 'yes'
          ? 325
          : formData.get('lien') === 'no'
          ? 200
          : 0
    };

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Thank you! Your info was submitted.');
        this.reset();
        vinField.style.display = 'none';
        lienContainer.style.display = 'none';
        lienMessage.style.display = 'none';
        offerAmount.textContent = '$0';
      } else {
        alert('There was an issue. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again later.');
    }
  });
</script>
