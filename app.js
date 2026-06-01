const express = require('express');
const path = require('path');
const app = express();



const renderPage = (title, heading, body, links) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <main>
      <h1>${heading}</h1>
      <p>${body}</p>
      <nav>
        ${links}
      </nav>
    </main>
  </body>
</html>`;

let homeVisits = 0;
const sentMessages = [];
const products = [
  { id: 1, name: 'Cuaderno', price: 3.5 },
  { id: 2, name: 'Lapiz', price: 1.2 },
  { id: 3, name: 'Mochila', price: 24.9 },
  { id: 4, name: 'Regla', price: 2.0 }
];
const phrases = [
  'El codigo limpio se lee como una historia.',
  'Pequenos pasos llevan a grandes cambios.',
  'La practica constante supera al talento.',
  'Depurar es parte del aprendizaje.',
  'Un problema dificil se resuelve dividiendolo.'
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas HTML
app.get('/', (req, res) => {
  homeVisits++;
  res.send(
    renderPage(
      'Página principal',
      'Página principal',
      `Bienvenido al sitio de ejemplo con Express. Esta ruta se ha visitado ${homeVisits} vez${homeVisits === 1 ? '' : 'es'} desde que inició el servidor.`,
      '<a href="/acerca">Ir a acerca</a> | <a href="/contacto">Ir a contacto</a> | <a href="/estilos">Ver página con estilos</a> | <a href="/encuesta">Ir a encuesta</a> | <a href="/mensajes">Ver mensajes</a>'
    )
  );
});

app.get('/acerca', (req, res) => {
  res.send(
    renderPage(
      'Acerca de este sitio',
      'Acerca de este sitio',
      'Esta página explica de qué trata el proyecto.',
      '<a href="/">Volver al inicio</a> | <a href="/contacto">Ir a contacto</a>'
    )
  );
});

app.get('/contacto', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contacto</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main class="card">
      <p class="eyebrow">Nivel 2</p>
      <h1>Formulario de contacto</h1>
      <p>Completa el formulario y envíalo por POST a esta misma ruta.</p>
      <form action="/contacto" method="POST" class="contact-form">
        <label for="name">Nombre</label>
        <input id="name" name="name" type="text" required />

        <label for="message">Mensaje</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Enviar</button>
      </form>
      <nav style="margin-top: 1.25rem;">
        <a href="/">Inicio</a> | <a href="/acerca">Acerca</a>
      </nav>
    </main>
  </body>
</html>`);
});

app.post('/contacto', (req, res) => {
  const { name, message } = req.body;

  res.send(`
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mensaje recibido</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main class="card">
      <p class="eyebrow">POST /contacto</p>
      <h1>Mensaje recibido</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
      <nav style="margin-top: 1.25rem;">
        <a href="/contacto">Volver al formulario</a> | <a href="/">Inicio</a>
      </nav>
    </main>
  </body>
</html>`);
});



app.get('/estilos', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Página con estilos</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main class="card">
      <p class="eyebrow">Nivel 1</p>
      <h1>Página con estilos</h1>
      <p>
        Esta página usa un archivo CSS externo servido desde la carpeta
        <strong>public</strong>.
      </p>
      <button id="button" type="button">Probar JavaScript</button>
      <p id="message" class="message">El diseño ya está conectado al CSS.</p>
      <nav style="margin-top: 1.25rem;">
        <a href="/">Inicio</a> | <a href="/acerca">Acerca</a> | <a href="/contacto">Contacto</a>
      </nav>
    </main>
    <script src="/main.js" defer></script>
  </body>
</html>`);
});

  app.get('/encuesta', (req, res) => {
    res.send(`
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Encuesta simple</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <main class="card">
        <p class="eyebrow">Nivel 2</p>
        <h1>Encuesta simple</h1>
        <p>¿Cuál es tu lenguaje favorito?</p>
        <form action="/encuesta" method="POST" class="contact-form">
          <label for="language">Lenguaje</label>
          <select id="language" name="language" required>
            <option value="">Selecciona una opción</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
          </select>

          <button type="submit">Votar</button>
        </form>
        <nav style="margin-top: 1.25rem;">
          <a href="/">Inicio</a> | <a href="/contacto">Contacto</a>
        </nav>
      </main>
    </body>
  </html>`);
  });

  app.post('/encuesta', (req, res) => {
    const { language } = req.body;

    res.send(`
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Resultado de la encuesta</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <main class="card">
        <p class="eyebrow">POST /encuesta</p>
        <h1>Resultado de la encuesta</h1>
        <p>Elegiste: <strong>${language}</strong></p>
        <nav style="margin-top: 1.25rem;">
          <a href="/encuesta">Volver a votar</a> | <a href="/">Inicio</a>
        </nav>
      </main>
    </body>
  </html>`);
  });

  app.get('/mensajes', (req, res) => {
    const messagesHtml = sentMessages.length
      ? `<ul class="message-list">${sentMessages.map((message) => `<li>${escapeHtml(message)}</li>`).join('')}</ul>`
      : '<p>Aún no se han enviado mensajes.</p>';

    res.send(`
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mensajes enviados</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <main class="card">
        <p class="eyebrow">Nivel 2</p>
        <h1>Mensajes enviados</h1>
        <p>Escribe un mensaje y verás el historial acumulado debajo.</p>
        <form action="/mensajes" method="POST" class="contact-form">
          <label for="message">Mensaje</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>
        <section style="margin-top: 1.5rem;">
          <h2>Mensajes anteriores</h2>
          ${messagesHtml}
        </section>
        <nav style="margin-top: 1.25rem;">
          <a href="/">Inicio</a> | <a href="/contacto">Contacto</a>
        </nav>
      </main>
    </body>
  </html>`);
  });

  app.post('/mensajes', (req, res) => {
    const { message } = req.body;

    if (message && message.trim()) {
      sentMessages.push(message.trim());
    }

    res.redirect('/mensajes');
  });

  app.get('/api/productos', (req, res) => {
    res.json(products);
  });

  app.post('/api/contacto', (req, res) => {
    const { name, message } = req.body;
    const safeName = (name || 'amigo').trim() || 'amigo';
    const safeMessage = (message || '').trim();

    res.json({
      success: true,
      message: `Hola, ${safeName}. Recibimos tu mensaje${safeMessage ? `: ${safeMessage}` : ''}.`
    });
  });

  app.post('/api/saludo', (req, res) => {
    const { name } = req.body;
    const safeName = (name || 'amigo').trim() || 'amigo';

    res.json({
      message: `Hola, ${safeName}. Bienvenido al formulario dinamico sin recarga.`
    });
  });

  app.get('/frase', (req, res) => {
    const index = Math.floor(Math.random() * phrases.length);
    res.json({ phrase: phrases[index] });
  });

  app.use(express.static(path.join(__dirname, 'public')));

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 