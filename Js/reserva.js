// Lista de paquetes disponibles (puedes cambiar imágenes y precios)
const paquetes = [
  {
    id: 1,
    nombre: 'Tour Quito Histórico',
    precio: 300,
    imagen: '../Img/imagen1.jpg',
    descripcion: 'Recorre el centro histórico de Quito con guía experto.'
  },
  {
    id: 2,
    nombre: 'Excursión a Cuenca',
    precio: 450,
    imagen: '../Img/imagen2.jpg',
    descripcion: 'Visita la hermosa ciudad de Cuenca y sus tradiciones.'
  },
  {
    id: 3,
    nombre: 'Tour Playas Esmeraldas',
    precio: 350,
    imagen: '../Img/imagen3.jpg',
    descripcion: 'Disfruta de las mejores playas del Pacífico ecuatoriano.'
  }
];

const ivaPercent = 12;
let carrito = [];

// Referencias DOM
const paquetesList = document.getElementById('paquetes-list');
const carritoList = document.getElementById('carrito-list');
const subtotalInput = document.getElementById('subtotal');
const ivaInput = document.getElementById('iva');
const totalInput = document.getElementById('total');
const enviarBtn = document.getElementById('enviarBtn');

// Función para renderizar paquetes disponibles
function renderPaquetes() {
  paquetes.forEach(p => {
    const item = document.createElement('div');
    item.className = 'item';

    const img = document.createElement('img');
    img.src = p.imagen;
    img.alt = p.nombre;

    const texto = document.createElement('div');
    texto.className = 'text-block';
    texto.innerHTML = `<strong>${p.nombre}</strong><br><em>${p.descripcion}</em><br><strong>Precio: $${p.precio.toFixed(2)}</strong>`;

    const btnAgregar = document.createElement('button');
    btnAgregar.className = 'btn-agregar';
    btnAgregar.textContent = 'Agregar';
    btnAgregar.onclick = () => agregarAlCarrito(p.id);

    item.appendChild(img);
    item.appendChild(texto);
    item.appendChild(btnAgregar);

    paquetesList.appendChild(item);
  });
}

// Agregar paquete al carrito
function agregarAlCarrito(id) {
  const paquete = paquetes.find(p => p.id === id);
  if (!paquete) return;

  carrito.push(paquete);
  renderCarrito();
  actualizarTotales();
}

// Remover paquete del carrito
function removerDelCarrito(index) {
  carrito.splice(index, 1);
  renderCarrito();
  actualizarTotales();
}

// Mostrar carrito en pantalla
function renderCarrito() {
  carritoList.innerHTML = '';
  carrito.forEach((p, index) => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '✖';
    btnEliminar.title = 'Eliminar';
    btnEliminar.onclick = () => removerDelCarrito(index);

    li.appendChild(btnEliminar);
    carritoList.appendChild(li);
  });

  enviarBtn.disabled = carrito.length === 0;
}

// Calcular y mostrar subtotal, IVA y total
function actualizarTotales() {
  const subtotal = carrito.reduce((sum, p) => sum + p.precio, 0);
  const iva = subtotal * ivaPercent / 100;
  const total = subtotal + iva;

  subtotalInput.value = subtotal.toFixed(2);
  ivaInput.value = iva.toFixed(2);
  totalInput.value = total.toFixed(2);
}

// Evento botón enviar
enviarBtn.addEventListener('click', () => {
  if (carrito.length === 0) return;
  let resumen = 'Resumen de tu reservación:\n\n';
  carrito.forEach(p => {
    resumen += `${p.nombre} - $${p.precio.toFixed(2)}\n`;
  });
  resumen += `\nSubtotal: $${subtotalInput.value}\nIVA: $${ivaInput.value}\nTotal: $${totalInput.value}`;
  alert(resumen);
});

// Inicialización
renderPaquetes();
