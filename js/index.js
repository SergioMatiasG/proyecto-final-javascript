
fetch(`https://apimocha.com/hardwareapi/posts`)
  .then( response => {
    return response.json();
  })
  .then( data => {

    const productosOferta = data.filter( producto => {
      return producto.oferta
    });

    const productosPerifericos = data.filter(producto => {
      return producto.categoria === 'periferico'
    });

    const cartasOferta = productosOferta.reduce((acc, element) => {
      return (
        acc +
        `
        <div class="swiper-slide">
          <div class="card carta ecartas" id=${element.id}>
            <figure class="cimgc">
              <img class="card-img-top" src="${element.imagen}" alt="${element.nombre}">
           </figure>
              <div class="card-body carta__cuerpo">
                <h2 class="carta__cuerpo__titulo">${element.nombre}</h2>
                <p class="card-text carta__cuerpo__texto">${element.descripcion}</p>
                <p class="card-text carta__cuerpo__texto">$ ${element.precio}</p>
                <button class="btn carta__cuerpo__boton agregar_carrito" id=${element.id}>Agregar al carrito</button>
              </div>
          </div>
        </div>
        `
      );
    }, "")
    
    const swiperOferta = new Swiper('.swiper-container-oferta', {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })
    const swiperWrapperOferta = document.querySelector('.swiper-wrapper-oferta')
    swiperWrapperOferta.innerHTML = cartasOferta;


    const cartasPerifericos = productosPerifericos.reduce((acc, element) => {
      return (
        acc +
        `
        <div class="swiper-slide">
          <div class="card carta ecartas" id=${element.id}>
            <figure class="cimgc">
              <img class="card-img-top" src="${element.imagen}" alt="${element.nombre}">
            </figure>
              <div class="card-body carta__cuerpo">
                <h2 class="carta__cuerpo__titulo">${element.nombre}</h2>
                <p class="card-text carta__cuerpo__texto">${element.descripcion}</p>
                <p class="card-text carta__cuerpo__texto">$ ${element.precio}</p>
                <button class="btn carta__cuerpo__boton agregar_carrito" id=${element.id}>Agregar al carrito</button>
              </div>
          </div>
        </div>
        `
      )
    }, "")

    const swiperPeriferico = new Swiper('.swiper-container-periferico', {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })

    const swiperWrapperPeriferico = document.querySelector('.swiper-wrapper-periferico')
    swiperWrapperPeriferico.innerHTML = cartasPerifericos
  })
  .catch((error) => {
    console.error('Error al obtener datos de la API', error)
  })
