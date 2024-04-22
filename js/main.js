const carrito = JSON.parse(localStorage.getItem("productos"))|| [];
const productos = [
    {
        id: "cpu1",
        nombre: "Ryzen 5 5600g",
        precio: 8000,
        imagen: "./img/cpu1.png",
    },
    {
        id: "cpu2",
        nombre: "Intel Core I3 10105",
        precio: 13000,
        imagen: "./img/cpu2.png",
    },
    {
        id: "gpu1",
        nombre: "Placa de Video RTX 3050",
        precio: 25000,
        imagen: "./img/gpu1.png",
    },
    {
        id: "gpu2",
        nombre: "Placa de Video RTX 4060 Ti",
        precio: 30000,
        imagen: "./img/gpu2.png",
    },
    {
        id: "disco1",
        nombre: "Disco Sólido SSD 240GB Kingstone",
        precio: 5600,
        imagen: "./img/disco1.jpg",
    },
    {
        id: "disco2",
        nombre: "Disco Sólido SSD 240GB WD Green",
        precio: 9000,
        imagen: "./img/disco2.jpg",
    },
    {
        id: "disco2",
        nombre: "Disco Sólido SSD 240GB WD Green",
        precio: 9000,
        imagen: "./img/disco2.jpg",
    },
    {
        id: "disco2",
        nombre: "Disco Sólido SSD 240GB WD Green",
        precio: 9000,
        imagen: "./img/disco2.jpg",
    },
    {
        id: "disco2",
        nombre: "Disco Sólido SSD 240GB WD Green",
        precio: 9000,
        imagen: "./img/disco2.jpg",
    },
    {
        id: "disco2",
        nombre: "Disco Sólido SSD 240GB WD Green",
        precio: 9000,
        imagen: "./img/disco2.jpg",
    },
    {
        id: "disco2",
        nombre: "Disco Sólido SSD 240GB WD Green",
        precio: 9000,
        imagen: "./img/disco2.jpg",
    },

]

const sectionProductos = document.querySelector("#productos")

function cargadorDeProductos(productos){
    sectionProductos.innerHTML = "";
    productos.forEach((producto) =>{
        let divTarjeta = document.createElement("div");
        divTarjeta.classList.add("tarjeta")
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
        });
    
        divDetalle.append(boton);
        divTarjeta.append(divDetalle)
        sectionProductos.append(divTarjeta);
    })
};

cargadorDeProductos(productos);

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

//BOTON DARK MODE

const colorDark = document.querySelector("#dark-button");
const body = document.querySelector("body");

colorDark.addEventListener("click", () =>{
    body.classList.toggle("dark-mode");

    if (colorDark.classList.contains("bi-moon")) {
        colorDark.classList.remove("bi-moon");
        colorDark.classList.add("bi-sun");
    }else {
        colorDark.classList.remove("bi-sun");
        colorDark.classList.add("bi-moon");
    };    
});


//BOTON CARRITO

const spanTotal = document.querySelectorAll (".total");
const contenedorCarritoBg = document.querySelector ("#bg-contenedor-carrito");
const contenedorCarritoSm = document.querySelector ("#contenedor-carrito");
const cerrarCarrito = document.querySelector ("#cerrar-carrito");
const header = document.querySelector("#header");
const alturaHeader = header.offsetHeight;
const carritoFlotante = document.querySelector("#carrito-flotante");
const carritoHeader = document.querySelector ("#carrito-header");

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

    calcularTotal();
    contadorCarrito();
    localStorage.setItem("productos", JSON.stringify(carrito));
};

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

function calcularTotal() {
    total = 0;
    carrito.forEach(
        (item) =>{
            total += (item.precio * item.cantidad);
        });

    spanTotal.forEach ( (span) => {
        span.innerText = `$${total}`;
    })

    return total;
};

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
});

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
});

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
});

const mensaje = document.querySelector("#mensaje");
const continuarMensaje = document.querySelector("#continuar-mensaje");

confirmarSi.addEventListener("click", () => {
    mensaje.classList.remove("d-none");
    pagar.classList.add("d-none");
});

confirmarNo.addEventListener("click", () => {
    pagar.classList.add("d-none");
    contenedorCarritoSm.classList.remove("d-none");
    footerCarrito.classList.remove("d-none");
    continuar.classList.remove("d-none");
});

continuarMensaje.addEventListener("click", () => {
    mensaje.classList.add("d-none");
    contenedorCarritoSm.classList.remove("d-none");
    footerCarrito.classList.remove("d-none");
    continuar.classList.remove("d-none");
    carrito.splice(0, carrito.length);
    total = 0;
    mostrarCarrito();
})

mostrarCarrito();