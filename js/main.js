//Local Storage.

const carrito = JSON.parse(localStorage.getItem("productos"))|| [];

//Llamada a la API (.json) contenedora de el array de productos.

fetch("./productos.json")
    .then((resp) => resp.json())
    .then((data) => {
        cargadorDeProductos(data);
    })

//Función que carga los productos al DOM.

const sectionProductos = document.querySelector("#productos")

function cargadorDeProductos(productos){
    sectionProductos.innerHTML = "";
    productos.forEach((producto) =>{
        let divTarjeta = document.createElement("div");
        divTarjeta.classList.add("tarjeta", "slide-in-bck-top")
        let divDetalle = document.createElement("div");
        divDetalle.classList.add("detalle-producto")

        divTarjeta.innerHTML = `
            <img src="${producto.imagen}">
        `;

        divDetalle.innerHTML = `
            <h3 class="nombre-tarjeta"> ${producto.nombre} </h3>
            <span class="precio-tarjeta"> $${producto.precio} </span>
            `;

        let boton = document.createElement("button");
        boton.classList.add("boton-producto");
        boton.innerText = "Agregar a Carrito";
        boton.addEventListener("click", () => {
            agregarCarrito(producto);

            Toastify({
                text: "Producto agregado al carrito",
                duration: 2000,
                style: {
                    background: "#1c5353", 
                    color: "#f2fbf9",
                    fontWeight: "bold",
                    border: "1px solid #0a2829",
                    borderRadius: "2rem", 
                    boxShadow: "0px 0px 10px 5px #f2fbf9",
                    maxWidth: "20rem",
                }
            }).showToast();
        });
    
        divDetalle.append(boton);
        divTarjeta.append(divDetalle)
        sectionProductos.append(divTarjeta);
    })
};


//FUNCION AGREGAR AL CARRITO

const carritoContador = document.querySelector("#contador-carrito");
const carritoFlotanteContador = document.querySelector("#contador-carrito-flotante");

function agregarCarrito(producto){
    const estaEnCarrito = carrito.find(item => (item.id === producto.id));

    if (estaEnCarrito === undefined){
        carrito.push({...producto, cantidad: 1});
    }else{
        estaEnCarrito.cantidad++;
    }
    mostrarCarrito();
    carritoScroll();
};

function contadorCarrito() {
    let contador = 0;
    if (carrito.length > 0){
        carrito.forEach( (item) => {
            contador += item.cantidad
            carritoContador.innerText = contador;
            carritoFlotanteContador.innerText = contador;
        })
    }else {
        carritoContador.innerText = contador;
        carritoFlotanteContador.innerText = contador;
    }
};

//DARK MODE.

const colorDark = document.querySelector("#dark-button");
const body = document.body;

//Revisar LS para saber en que modo iniciar.

if (localStorage.getItem("drk-mode") === "claro") {
    body.classList.remove("dark-mode")
    colorDark.classList.add("bi-moon");
    colorDark.classList.remove("bi-sun");
} else {
    body.classList.add("dark-mode")
    colorDark.classList.add("bi-sun");
    colorDark.classList.remove("bi-moon");
}

//Evento de botón.

colorDark.addEventListener("click", () =>{
    body.classList.toggle("dark-mode");

    if (colorDark.classList.contains("bi-moon")) {
        colorDark.classList.remove("bi-moon");
        colorDark.classList.add("bi-sun");
        localStorage.setItem("drk-mode", "oscuro")
    }else {
        colorDark.classList.remove("bi-sun");
        colorDark.classList.add("bi-moon");
        localStorage.setItem("drk-mode", "claro")
    };    
});


//BOTON CARRITO

const spanTotal = document.querySelectorAll (".total");
const contenedorCarritoBg = document.querySelector ("#bg-contenedor-carrito");
const contenedorCarritoSm = document.querySelector ("#contenedor-carrito");
const cerrarCarrito = document.querySelector ("#cerrar-carrito");
const header = document.querySelector("#header");
const carritoFlotante = document.querySelector("#carrito-flotante");
const carritoHeader = document.querySelector ("#carrito-header");

//Función para hacer que el carrito aparezca abajo a la izquierda cuando se scrollea (solo si hay productos en el mismo).

const alturaHeader = header.offsetHeight;

function carritoScroll () {
    const scrollTop = document.documentElement.scrollTop;
    if (contenedorCarritoBg.classList.contains("d-none")) {
        if (scrollTop > alturaHeader) {
            if (carrito.length > 0) {
                carritoFlotante.classList.remove("d-none");
            }else {
                carritoFlotante.classList.add("d-none");
            };
        }else {
            carritoFlotante.classList.add("d-none");
        };
    };
};

window.addEventListener("scroll", () => {
    carritoScroll();
});

carritoFlotante.addEventListener("click", () => {
    contenedorCarritoBg.classList.remove("d-none");
    carritoFlotante.classList.add("d-none");
});

carritoHeader.addEventListener("click", () => {
    if (carrito.length > 0) {
        contenedorCarritoBg.classList.toggle("d-none");
    }
});

cerrarCarrito.addEventListener("click", () => {
    const scrollTop = document.documentElement.scrollTop;
    contenedorCarritoBg.classList.add("d-none");
    if (carrito.length > 0) {
        if (scrollTop !== 0) {
            carritoFlotante.classList.remove("d-none");
        }
    }
});

//Función para que aparezcan los productos seleccionados en el carrito.

function mostrarCarrito() {
    contenedorCarritoSm.innerHTML = ""; 
    carrito.forEach((item) => {
        let divCarrito = document.createElement("div");
        divCarrito.classList.add("producto-carrito");
        divCarrito.innerHTML = `
            <p>${item.nombre}</p>
            <span>$${item.precio}</span>
            `;

        let divCantidad = document.createElement("div");
        divCantidad.classList.add("div-cantidad");
        divCantidad.innerHTML = `
            <span>x${item.cantidad}</span>
        `;

        let botonMenos = document.createElement("i");
        botonMenos.classList.add("bi", "bi-dash-square", "menos-cantidad");
        botonMenos.addEventListener("click", () => {
            menosCantidad(item);
        });

        let botonMas = document.createElement("i");
        botonMas.classList.add("bi", "bi-plus-square", "mas-cantidad");
        botonMas.addEventListener("click", () => {
            masCantidad(item);
        });

        let botonEliminar = document.createElement("i");
        botonEliminar.classList.add("bi", "bi-trash-fill", "eliminar-carrito");
        botonEliminar.addEventListener("click", () => {
            eliminarCarrito(item);
        });
        

        divCantidad.prepend(botonMenos);
        divCantidad.append(botonMas);
        divCarrito.append(divCantidad)
        divCarrito.append(botonEliminar);
        contenedorCarritoSm.append(divCarrito)          
    });

    if (carrito.length === 0) {
        contenedorCarritoBg.classList.add("d-none");
    }

    calcularTotalCarrito();
    mostrarTotal(total);
    contadorCarrito();
    localStorage.setItem("productos", JSON.stringify(carrito));
};

//Funcionalidades dentro del carrito.

function eliminarCarrito(producto) {
    let indiceEliminar = carrito.findIndex(productos => productos.id === producto.id);

    carrito.splice(indiceEliminar, 1);
    mostrarCarrito();
};

function masCantidad (producto) {
    let indiceProd = carrito.findIndex(productos => productos.id === producto.id);
    carrito[indiceProd].cantidad++;
    mostrarCarrito();
};

function menosCantidad (producto) {
    let indiceProd = carrito.findIndex(productos => productos.id === producto.id);
    carrito[indiceProd].cantidad--;
    let cantidadNueva = carrito[indiceProd].cantidad;
    if (cantidadNueva === 0){
        eliminarCarrito(producto);
    };
    mostrarCarrito();
};

let total = 0;

function calcularTotalCarrito() {
    total = 0;

    carrito.forEach(
        (item) =>{
            total += (item.precio * item.cantidad);
        });
};

//Funcionalidad primer botón continuar.

const continuar = document.querySelector("#boton-continuar");
const elegirEntrega = document.querySelector("#elegir-entrega");
const volverEntrega = document.querySelector ("#boton-volver-entrega");
const continuarEntrega = document.querySelector ("#boton-continuar-entrega");


continuar.addEventListener("click", () => {
    contenedorCarritoSm.classList.add("d-none");
    continuar.classList.add("d-none");
    elegirEntrega.classList.remove("d-none");
    volverEntrega.classList.remove("d-none");
    continuarEntrega.classList.remove("d-none");
});

//Funcionalidad de la sección para seleccionar tipo de entrega.

const opcionEntregaLoc = document.querySelector("#entrega-local");
const opcionEntregaDom = document.querySelector("#entrega-domicilio");
const elegirPago = document.querySelector("#elegir-pago");
const continuarPago = document.querySelector("#boton-continuar-pago");
const volverPago = document.querySelector("#boton-volver-pago");

continuarEntrega.addEventListener("click", () => {
   if (opcionEntregaLoc.checked){
        elegirEntrega.classList.add("d-none");
        volverEntrega.classList.add("d-none");
        continuarEntrega.classList.add("d-none");
        elegirPago.classList.remove("d-none");
        continuarPago.classList.remove("d-none")
        volverPago.classList.remove("d-none")
    }else if (opcionEntregaDom.checked){
        elegirEntrega.classList.add("d-none");
        volverEntrega.classList.add("d-none");
        continuarEntrega.classList.add("d-none");
        elegirPago.classList.remove("d-none");
        continuarPago.classList.remove("d-none");
        volverPago.classList.remove("d-none");
    };
});

volverEntrega.addEventListener("click", () => {
    contenedorCarritoSm.classList.remove("d-none");
    elegirEntrega.classList.add("d-none");
    volverEntrega.classList.add("d-none");
    continuarEntrega.classList.add("d-none");
    continuar.classList.remove("d-none");
    opcionEntregaDom.checked = false;
    opcionEntregaLoc.checked = false;
    calcularTotalGlobal();
    mostrarTotal(total);
});

//Funcionalidad de la sección para seleccionar forma de pago.

const opcionEfectivo = document.querySelector("#pago-efectivo");
const opcionDebito = document.querySelector("#pago-debito");
const opcionCredito = document.querySelector("#pago-credito");
const pagar = document.querySelector("#confirmar-pagar");
const continuarCredito = document.querySelector("#boton-continuar-credito");
const volverCredito = document.querySelector("#boton-volver-credito");
const elegirCredito = document.querySelector("#elegir-credito");
const confirmarSi = document.querySelector("#boton-confirmar-si");
const confirmarNo = document.querySelector("#boton-confirmar-no");
const footerCarrito = document.querySelector ("#footer-carrito");

continuarPago.addEventListener("click", () => {
    if (opcionEfectivo.checked){
        elegirPago.classList.add("d-none");
        footerCarrito.classList.add("d-none");
        pagar.classList.remove("d-none");
        continuarPago.classList.add("d-none");
        volverPago.classList.add("d-none");
    }else if (opcionDebito.checked) {
        elegirPago.classList.add("d-none");
        footerCarrito.classList.add("d-none");
        pagar.classList.remove("d-none");
        continuarPago.classList.add("d-none");
        volverPago.classList.add("d-none");
    }else if (opcionCredito.checked) {
        elegirPago.classList.add("d-none");
        elegirCredito.classList.remove("d-none");
        continuarPago.classList.add("d-none");
        volverPago.classList.add("d-none");
        continuarCredito.classList.remove("d-none");
        volverCredito.classList.remove("d-none");
    };
});

volverPago.addEventListener("click", () => {
    elegirPago.classList.add("d-none");
    continuarPago.classList.add("d-none");
    volverPago.classList.add("d-none");
    elegirEntrega.classList.remove("d-none");
    volverEntrega.classList.remove("d-none");
    continuarEntrega.classList.remove("d-none");
    opcionEfectivo.checked = false;
    opcionDebito.checked = false;
    opcionCredito.checked = false;
    opcionEntregaDom.checked = false;
    opcionEntregaLoc.checked = false;   
    calcularTotalGlobal()
    mostrarTotal(total);
});

//Funcionalidad de la sección para seleccionar tipo de crédito.

const opcionTresCuotas = document.querySelector("#tres-cuotas");
const opcionSeisCuotas = document.querySelector("#seis-cuotas");
const opcionDoceCuotas = document.querySelector("#doce-cuotas");

continuarCredito.addEventListener("click", () => {
    if (opcionTresCuotas.checked){
        elegirCredito.classList.add("d-none");
        pagar.classList.remove("d-none");
        footerCarrito.classList.add("d-none");
        continuarCredito.classList.add("d-none");
        volverCredito.classList.add("d-none");
    }else if (opcionSeisCuotas.checked) {
        elegirCredito.classList.add("d-none");
        pagar.classList.remove("d-none");
        footerCarrito.classList.add("d-none");
        continuarCredito.classList.add("d-none");
        volverCredito.classList.add("d-none");
    }else if (opcionDoceCuotas.checked) {
        elegirCredito.classList.add("d-none");
        pagar.classList.remove("d-none");
        footerCarrito.classList.add("d-none");
        continuarCredito.classList.add("d-none");
        volverCredito.classList.add("d-none");
    };
});

volverCredito.addEventListener("click", () => {
    elegirCredito.classList.add("d-none");
    elegirPago.classList.remove("d-none");
    continuarCredito.classList.add("d-none");
    volverCredito.classList.add("d-none");
    continuarPago.classList.remove("d-none");
    volverPago.classList.remove("d-none");
    opcionEfectivo.checked = false;
    opcionDebito.checked = false;
    opcionCredito.checked = false;
    opcionTresCuotas.checked = false;
    opcionSeisCuotas.checked = false;
    opcionDoceCuotas.checked = false;
    calcularTotalGlobal();
    mostrarTotal(subtotalEntrega);
});

//Funcionalidad de la sección confirmar compra.

confirmarSi.addEventListener("click", () => {
    Swal.fire({
        title:"¡COMPRA EXITOSA!",
        text: "Gracias por su compra",
        icon:"success",
        showConfirmButton: false,
        timer: 2000,
        customClass: "mensaje-alerta",
        background: "#0a2829",
    })

    contenedorCarritoSm.classList.remove("d-none");
    footerCarrito.classList.remove("d-none");
    continuar.classList.remove("d-none");
    carrito.splice(0, carrito.length);
    total = 0;
    opcionEfectivo.checked = false;
    opcionDebito.checked = false;
    opcionCredito.checked = false;
    opcionEntregaDom.checked = false;
    opcionEntregaLoc.checked = false;  
    opcionTresCuotas.checked = false;
    opcionSeisCuotas.checked = false;
    opcionDoceCuotas.checked = false; 
    mostrarCarrito();
    pagar.classList.add("d-none");
});

confirmarNo.addEventListener("click", () => {
    pagar.classList.add("d-none");
    contenedorCarritoSm.classList.remove("d-none");
    footerCarrito.classList.remove("d-none");
    continuar.classList.remove("d-none");
    opcionEfectivo.checked = false;
    opcionDebito.checked = false;
    opcionCredito.checked = false;
    opcionEntregaDom.checked = false;
    opcionEntregaLoc.checked = false;
    opcionTresCuotas.checked = false;
    opcionSeisCuotas.checked = false;
    opcionDoceCuotas.checked = false; 
    calcularTotalGlobal();
    mostrarTotal(total);
});

//Funciones para calcular el total de cada sección según las opciones que se elijan.

function mostrarTotal(n) {
    spanTotal.forEach ( (span) => {
        span.innerText = `$${n}`;
    })
}

let subtotalEntrega = 0;
let subtotalPagoEfectivo = 0;
let subtotalCuotas = 0;
let cantidadCuotas = 0;

const tiposEntrega = document.getElementsByName("tipo-entrega");
const tiposPagos = document.getElementsByName("tipo-pago");
const tiposCuotas = document.getElementsByName("tipo-cuota");
const spanCuotas = document.querySelector("#mostrar-cuotas");

function calcularTotalEntrega() {
    for (let i = 0; i < tiposEntrega.length; i++) {
        tiposEntrega[i].addEventListener ("change", () => {
            let costoExtra = parseInt(tiposEntrega[i].value);
            calcularTotalCarrito();
            if (costoExtra != 0) {
                subtotalEntrega = total + costoExtra;
                mostrarTotal(subtotalEntrega);
            } else {
                subtotalEntrega = total;
                mostrarTotal(subtotalEntrega);
            };
        });
    };
};

function calcularTotalPagoEfectivo () {
    for (let i = 0; i < tiposPagos.length; i++) {
        tiposPagos[i].addEventListener ("change", () => {
            let opcionPago = tiposPagos[i].value;
            if (opcionPago === "efectivo") {
                subtotalPagoEfectivo = subtotalEntrega * 0.85;
                mostrarTotal(subtotalPagoEfectivo);
                spanCuotas.classList.add("d-none")
            }else if (opcionPago === "credito"){
                subtotalPagoEfectivo = subtotalEntrega;
                mostrarTotal(subtotalPagoEfectivo);
                spanCuotas.classList.remove("d-none")
            }else {
                subtotalPagoEfectivo = subtotalEntrega;
                mostrarTotal(subtotalPagoEfectivo);
                spanCuotas.classList.add("d-none")
            };
        });
    };
};

function mostrarCuotas (n) {
    let precioMensual = subtotalCuotas / n;
    spanCuotas.innerText = `${n} cuotas de $${precioMensual.toFixed(2)}`
}

function calcularTotalCuota () {
    for (let i = 0; i < tiposCuotas.length; i++) {
        tiposCuotas[i].addEventListener ("change", () => {
            let opcionCuota = parseInt(tiposCuotas[i].value);

            if (opcionCuota === 3) {
                subtotalCuotas = subtotalPagoEfectivo;
                mostrarTotal(subtotalCuotas);
                mostrarCuotas (opcionCuota);
            } else if (opcionCuota === 6) {
                subtotalCuotas = subtotalPagoEfectivo * 1.25;
                mostrarTotal(subtotalCuotas);
                mostrarCuotas (opcionCuota);
            } else if (opcionCuota === 12) {
                subtotalCuotas = subtotalPagoEfectivo * 1.45;
                mostrarTotal(subtotalCuotas);
                mostrarCuotas (opcionCuota);
            }
        })
    }
}

function calcularTotalGlobal() {
    calcularTotalCarrito();
    calcularTotalEntrega();
    calcularTotalPagoEfectivo();
    calcularTotalCuota ();
}

calcularTotalGlobal();
mostrarCarrito();