const statusEl = document.querySelector('#status');
const listEl = document.querySelector('#product-list');

const renderProducts = (products) => {
  listEl.innerHTML = products
    .map(
      (product) =>
        `<li><strong>${product.name}</strong> - $${product.price.toFixed(2)}</li>`
    )
    .join('');
};

const loadProducts = async () => {
  try {
    const response = await fetch('/api/productos');

    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }

    const products = await response.json();
    statusEl.textContent = `Se cargaron ${products.length} productos.`;
    renderProducts(products);
  } catch (error) {
    statusEl.textContent = 'No se pudieron cargar los productos.';
    listEl.innerHTML = '';
  }
};

loadProducts();
