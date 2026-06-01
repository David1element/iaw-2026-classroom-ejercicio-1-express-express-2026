const button = document.querySelector('#load-phrase');
const phraseEl = document.querySelector('#phrase');

const loadPhrase = async () => {
  phraseEl.textContent = 'Cargando...';

  try {
    const response = await fetch('/frase');

    if (!response.ok) {
      throw new Error('Error al cargar la frase');
    }

    const data = await response.json();
    phraseEl.textContent = data.phrase;
  } catch (error) {
    phraseEl.textContent = 'No se pudo cargar la frase.';
  }
};

button.addEventListener('click', loadPhrase);
