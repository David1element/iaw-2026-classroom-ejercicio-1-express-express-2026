const form = document.querySelector('#dynamic-form');
const responseEl = document.querySelector('#response');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  responseEl.textContent = 'Enviando...';

  const formData = new FormData(form);
  const payload = {
    name: formData.get('name')
  };

  try {
    const response = await fetch('/api/saludo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Error al enviar');
    }

    const data = await response.json();
    responseEl.textContent = data.message;
    form.reset();
  } catch (error) {
    responseEl.textContent = 'No se pudo enviar el formulario.';
  }
});
