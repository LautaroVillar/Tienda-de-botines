const contenedorProductos = document.getElementById('contenedor-productos')



const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []



document.addEventListener('DOMContentLoaded', () => {
        // fetchData()
    //operador ternario
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// const fetchData = async () => {
//     try {
//         const res = await fetch("/apiStock.json")
//         const data = await res.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }




//---------------Vaciamos el carrito-------------------------
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//-------------Seleccionamos la sección Adidas-------------------
const mostrarProductos = async () => {
    const resp = await fetch("/apiStock.json")
    const data = await resp.json()
if (document.title === 'Tienda de botines-Adidas'){
    const stockProductosAdidas = data.filter(productoAdidas => productoAdidas.marca === "Adidas")
    stockProductosAdidas.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} class="img" alt= "">
    <h3>${producto.nombre}</h3>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fa-solid fa-cart-plus"></i></button>
    `
    contenedorProductos.appendChild(div)

   
    const boton = document.getElementById(`agregar${producto.id}`)
   

    boton.addEventListener('click', () => {
       
        agregarAlCarrito(producto.id)
       
    })
})
}

//-----------Seleccionamos la sección Nike--------------
if (document.title === 'Tienda de botines-Nike'){
        const stockProductosNike = data.filter(productoNike => productoNike.marca === "Nike")
        stockProductosNike.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} class="img" alt= "">
        <h3>${producto.nombre}</h3>
        <p>Talle: ${producto.talle}</p>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fa-solid fa-cart-plus"></i></button>
        `
        contenedorProductos.appendChild(div)
    
       
        const boton = document.getElementById(`agregar${producto.id}`)
       
    
        boton.addEventListener('click', () => {
           
            agregarAlCarrito(producto.id)
           
        })
    })
}
//---------------Seleccionamos la seccción Puma---------------------
if (document.title === 'Tienda de botines-Puma'){
        const stockProductosPuma = data.filter(productoPuma => productoPuma.marca === "Puma")
        stockProductosPuma.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} class="img" alt= "">
        <h3>${producto.nombre}</h3>
        <p>Talle: ${producto.talle}</p>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fa-solid fa-cart-plus"></i></button>
        `
        contenedorProductos.appendChild(div)
    
       
        const boton = document.getElementById(`agregar${producto.id}`)
       
    
        boton.addEventListener('click', () => {
           
            agregarAlCarrito(producto.id)
           
        })
    })
}

//-----------------Agregamos los productos al carrito-----------------
const agregarAlCarrito = (prodId) => {
    Toastify({
        text: "Se agrego su producto al carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
    
    const existe = carrito.some (prod => prod.id === prodId) 
    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                //operador ++
                prod.cantidad++
            }
        })
    } else { 
        const item = data.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}
}

mostrarProductos()

//-----------------Eliminamos los productos del carrito----------------------
const eliminarDelCarrito = (prodId) => {
    Swal.fire({
        title: '¿Estas seguro que queres eliminar el producto?',
        text: "No vas a poder revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'cancelar',
        confirmButtonText: 'Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:'Eliminado!',
            text:'Tu producto fue eliminado.',
            timer: 3000
        })
          actualizarCarrito() 
        }
      })
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
       
}
//--------------Actualizamos los productos dentro del carrito----------------------
const actualizarCarrito = () => {
    

    contenedorCarrito.innerHTML = "" 

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
   //----------Nos da como resultado la cantidad de productos que tenemos en el carrito----------
    contadorCarrito.innerText = carrito.length 

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
}