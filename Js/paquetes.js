window.carrito = window.carrito || [];

document.addEventListener('DOMContentLoaded', () => {
  const paquetes = document.querySelectorAll('.paquete-item');

  paquetes.forEach(paquete => {
    const btn = paquete.querySelector('.btn-agregar');
    btn.addEventListener('click', () => {
      const paqueteInfo = {
        id: paquete.dataset.id,
        nombre: paquete.dataset.name,
        precio: parseFloat(paquete.dataset.price),
      };

      if (!window.carrito.find(p => p.id === paqueteInfo.id)) {
        window.carrito.push(paqueteInfo);
        alert(`Paquete "${paqueteInfo.nombre}" agregado a Reservas.`);
      } else {
        alert('Este paquete ya está en Reservas.');
      }
    });
  });
});
