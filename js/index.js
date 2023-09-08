const urlCards = 'hardware.js'
const carruselOfertas = document.getElementById('swiper-wrapper')
const carruselComponentes = document.getElementById('swiper-wrapper-2')

async function cargarProductosDesdeAPI() {
    try {
      const response = await fetch(urlCards);
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de la API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cargar los productos desde la API:', error);
      throw error;
    }
  }
  
  function renderizarProductosEnCarrusel(productos, carruselElement) {
    const cardsHTML = productos.reduce((acc, element) => {
      return (
        acc +
        `
        <div class="swiper-slide">
            <div class="card carta ecartas" style="width: 20rem" id="id_card_${element.id}">
                <figure class="cimgc">
                <img class="card-img-top" src="${element.imagen}" alt="${element.nombre}">
                </figure>
                <div class="card-body carta__cuerpo">
                    <h2 class="carta__cuerpo__titulo">${element.nombre}</h2>
                    <p class="card-text carta__cuerpo__texto">${element.descripcion}</p>
                    <p class="card-text carta__cuerpo__texto">$${element.precio}</p>
                    <button class="btn carta__cuerpo__boton agregar_carrito" id="button--${element.id}" >Agregar al carrito</button>
                </div>
            </div>
        </div>
        `
      );
    }, '');
  
    carruselElement.innerHTML = cardsHTML;
  
    const swiper = new Swiper("swiper-wrapper", {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })
    const swiper2 = new Swiper("swiper-wrapper-2",{
        slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })
  }
  
  cargarProductosDesdeAPI()
    .then((productos) => {
      const productosEnOferta = productos.filter((element) => element.oferta)
      renderizarProductosEnCarrusel(productosEnOferta, carruselOfertas)
  
      const productosCategoriaElectronica = productos.filter((element) => element.categoria === 'periferico');
      renderizarProductosEnCarrusel(productosCategoriaElectronica,carruselComponentes);
  
    })
    .catch((error) => {
      console.error('Error general:', error);
    });













