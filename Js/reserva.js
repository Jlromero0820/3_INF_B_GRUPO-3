document.addEventListener('DOMContentLoaded', () => {
  const carritoList = document.getElementById('carrito-list');
  const subtotalInput = document.getElementById('subtotal');
  const ivaInput = document.getElementById('iva');
  const totalInput = document.getElementById('total');
  const enviarBtn = document.getElementById('enviarBtn');

  window.carrito = window.carrito || [];
  let carrito = window.carrito;

  function actualizarTotales() {
    const subtotal = carrito.reduce((acc, item) => acc + item.precio, 0);
    const iva = subtotal * 0.12;
    const total = subtotal + iva;

    subtotalInput.value = subtotal.toFixed(2);
    ivaInput.value = iva.toFixed(2);
    totalInput.value = total.toFixed(2);

    enviarBtn.disabled = carrito.length === 0;
  }

  function renderizarCarrito() {
    carritoList.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'X';
      btnEliminar.addEventListener('click', () => {
        carrito = carrito.filter(i => i.id !== item.id);
        window.carrito = carrito;
        renderizarCarrito();
        actualizarTotales();
      });

      li.appendChild(btnEliminar);
      carritoList.appendChild(li);
    });
  }

  renderizarCarrito();
  actualizarTotales();

  enviarBtn.addEventListener('click', () => {
    alert('¡Reservación enviada con éxito!');
    carrito = [];
    window.carrito = carrito;
    renderizarCarrito();
    actualizarTotales();
  });
});