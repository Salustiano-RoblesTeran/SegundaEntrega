let carrito;
let total;
// Chequeamos si hay informacion en el localStorage
if(localStorage.getItem("carrito") != null || localStorage.getItem("total")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    total = JSON.parse(localStorage.getItem("total"));
    for (const producto of carrito) {
        document.getElementById("tablabody").innerHTML+=`
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>`;
    }
    let precioTotal = document.getElementById("precioTotal");
    precioTotal.textContent = `$${total}`;
} else {
    carrito = [];
    total = 0;
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
    carrito.push(productoNuevo);
    console.log(carrito);
    Swal.fire({
        title: 'Producto agregado!',
        text: `Se agrego ${productoNuevo.nombre}`,
        imageUrl: `${productoNuevo.foto}`,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Imagen de carrito',
      })
    // alert(`producto: ${productoNuevo.nombre} agregado al carro!`);
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
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', JSON.stringify(total));

}

// Boton finalizar compra

let finalizar = document.getElementById("finalizar");

finalizar.onclick = () => {
    Swal.fire(
        'Gracias por tu compra!',
        `El total es de ${total}`,
        'success'
      )
    // alert(`El total de tu carrito es: $${total}`);
}

// Boton borrar carrito
let borrar = document.getElementById("borrar");

borrar.onclick = () => {
    carrito = [];
    document.getElementById("tablabody").innerHTML = '';
    total = 0;
    precioTotal.textContent = `$${total}`;
    Toastify ({
        text: "Se borro el carrito.",
        duration: 3000,
    }).showToast();
    // alert("Se borro tu carrito");
    localStorage.clear();
}


