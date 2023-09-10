
const contenedorCarritoProducto = document.querySelector(".contenedor-cards-productos")
const cardInfo = document.querySelector(".card-productos")
const rowPorducto = document.querySelector(".row-producto")





let carritoGuardado = JSON.parse(localStorage.getItem('ProductosC')) || []
let datosObtenidos = []

fetch (`https://apimocha.com/hardwareapi/posts`)
    .then(respuesta => respuesta.json())
    .then(data => {
        datosObtenidos.push(...data)
        console.log(datosObtenidos)
    })
    .catch((error) => {
        console.error("Error al obtener datos desde el servidor:", error);
    });

document.body.onclick = ( e => {
    if (e.target.classList.contains('agregar_carrito')) {
        const id = e.target.id
        const producto = datosObtenidos.find((item) => item.id === id)
        const productoExistente = carritoGuardado.find((item) => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1
        } else {
            producto.cantidad = 1
            carritoGuardado.push(producto)
        }
        localStorage.setItem('ProductosC', JSON.stringify(carritoGuardado))

        renderizarCarrito()
        actualizarContadorCarrito()
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
        })

        Toast.fire({
            iconColor: '#17FD03',
            icon: 'success',
            title: 'Agregado al carrito',
            color: '#17FD03',
            background: '#000',
        })
    }
})
    





function actualizarContadorCarrito() {
        const contadorCarrito = document.querySelector(".contador-productos")
        if (contadorCarrito) {
            const cantidadTotal = carritoGuardado.reduce((total, producto) => total + producto.cantidad, 0)
            contadorCarrito.textContent = cantidadTotal
        }
    }
const btnCarrito = document.querySelector(".conteneder-carrito-icono")

            btnCarrito.addEventListener("click",()=>{
            contenedorCarritoProducto.classList.toggle("hidden-card")
            renderizarCarrito()
        
            })

document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("icon-close")) {
            const closeBtn = e.target
            const productId = closeBtn.id.replace("close-", "")
            const productoGuardado = carritoGuardado.find(item => item.id === productId)
            console.log(productoGuardado)
             if (productoGuardado ) {
                if (productoGuardado .cantidad > 1) {
                    productoGuardado .cantidad -= 1
                } else {
                    const index = carritoGuardado.indexOf(productoGuardado)
                    if (index !== -1) {
                        carritoGuardado.splice(index, 1)
                    }
                }
                localStorage.setItem("ProductosC", JSON.stringify(carritoGuardado))
                renderizarCarrito()
                actualizarContadorCarrito()
            }
        }
        if (e.target.classList.contains("icon-agregar")) {
            const closeBtn = e.target;
            const productId = closeBtn.id.replace("agregar-", "") 
            const productoExistente = carritoGuardado.find(item => item.id === productId)
            if (productoExistente) {
                productoExistente.cantidad += 1
                localStorage.setItem("ProductosC", JSON.stringify(carritoGuardado))
                renderizarCarrito()
                actualizarContadorCarrito()
            }
        }
    });

    function renderizarCarrito (){
        const ProductosGuardados = JSON.parse(localStorage.getItem("ProductosC")) || []
        if (ProductosGuardados){
            rowPorducto.innerHTML = ""
            let total = 0
            const productoHTML = `${ProductosGuardados.map(producto =>{
                total = total + Number(producto.precio) * Number(producto.cantidad)
                return `
                <div class="card-productos">
                <div>
                    <img class="imgcarrito" src="${producto.imagen}" alt="${producto.nombre}">   
                 </div>
                <div class="info-card-producto">
                        <p class="titulo-producto-carrito">${producto.nombre}</p>
                        <span class="cantidad-producto-carrito">Cantidad : ${producto.cantidad}</span>
                        <span class="precio-producto-carrito">Precio : ${producto.precio}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="icon-agregar"
                    id="agregar-${producto.id}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="icon-close"
                    id="close-${producto.id}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </div>
                </div>
                `
                
                })}
            <div class="card-total">
                <h3>total :</h3>
                <span class="total-pagar">${total}</span>
            </div>
            <div class= "contenedorbotonesconbor">
                <div class = "contenebtnborrar"> 
                    <button class="btn carta__cuerpo__boton borrarcarrito ">Borrar Carrito</button>
                </div>
                <div class = "contenebtnborrar"> 
                    <button class="btn carta__cuerpo__boton confirmarcompra ">Confirmar</button>
                </div>
             </div>
            
            
            `
            rowPorducto.innerHTML = productoHTML
        } else{
            rowPorducto.innerHTML = "El carrito esta vacio"
        }
        const btnBorrarCarrito = document.querySelector(".borrarcarrito")
        if(btnBorrarCarrito){
            btnBorrarCarrito.addEventListener("click", () => {
                localStorage.removeItem("ProductosC")
                rowPorducto.innerHTML = "El carrito fue vaciado"
                carritoGuardado = []
                actualizarContadorCarrito()
    
        })}
        const btnConfirmarCompra = document.querySelector(".confirmarcompra")
        if(btnConfirmarCompra){
            btnConfirmarCompra.addEventListener("click", () => {
                localStorage.removeItem("ProductosC")
                rowPorducto.innerHTML = ""
                carritoGuardado = []
                actualizarContadorCarrito()
                Swal.fire({
                    iconColor : '#17FD03',
                    confirmButtonColor:"#17FD03",
                    color :'#17FD03',
                    icon: 'success',
                    background : '#000',
                    title: 'Su compra fue realizada, le enviamos un email con la info',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
    
        }
        )
        }
    
    }
    actualizarContadorCarrito()