let carrito;
let total = 0;

if(localStorage.getItem("carrito") != null) {
    carrito = [JSON.parse(localStorage.getItem("carrito"))];
} else {
    carrito = [];
}

let lista=document.getElementById("milista");
    
//llamada a renderizar
renderizarProductos();


// Funcion que renderizara los productos en la pantalla
function renderizarProductos() {
    for (const producto of productos) {
        lista.innerHTML+=`<li class="col-sm-3 list-group-item">
        <img src=${producto.foto} width="250" height="250">
        <h3> Producto: ${producto.nombre}</h3>
        <p><strong> $ ${producto.precio} </strong></p>
        <button class='btn btn-secondary' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    // Boton de agregar al carrito
    productos.forEach(producto => {
        //Evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener('click', function() {
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(productoNuevo) {
    cargarCarritoDeLocalStorage ();
    carrito.push(productoNuevo);
    console.log(carrito);
    alert(`producto: ${productoNuevo.nombre} agregado al carro!`);
    document.getElementById("tablabody").innerHTML+=`
    <tr>
        <td>${productoNuevo.id}</td>
        <td>${productoNuevo.nombre}</td>
        <td>${productoNuevo.precio}</td>
    </tr>`;

        // Mostramos el total
        let precioTotal = document.getElementById("precioTotal");
        total += productoNuevo.precio;
        precioTotal.textContent = `$${total}`;

    // Almacenamos los productos del carrito en el storage

    guardarCarritoEnLocalStorage ();
}

// Boton finalizar compra

let finalizar = document.getElementById("finalizar");

finalizar.onclick = () => {
    alert(`El total de tu carrito es: $${total}`);
}

// Boton borrar carrito
let borrar = document.getElementById("borrar");

borrar.onclick = () => {
    carrito = [];
    document.getElementById("tablabody").innerHTML = '';
    total = 0;
    precioTotal.textContent = `$${total}`;
    guardarCarritoEnLocalStorage ();
    alert("Se borro tu carrito");
}


function guardarCarritoEnLocalStorage () {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
}
