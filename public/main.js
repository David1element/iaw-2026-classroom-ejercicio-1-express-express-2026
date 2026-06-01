const button = document.querySelector('#button');
const message = document.querySelector('#message');

button.addEventListener('click', () => {
  message.textContent = 'El archivo JavaScript también se está sirviendo desde public.';
});
