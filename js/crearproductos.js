const url = `https://apimocha.com/hardwareapi/posts`
const contenedorCartas = document.querySelector(".contenedor_cartas")
const ordenarCards = document.querySelector("#ordenar")

const crearCartas = (array) => {
    const cards = array.reduce((acc,element) => {
        return acc + `
        <div class="card carta ecartas" style="width: 20rem" id =${element.id}">
                <figure class="cimgc">
                <img class="card-img-top" src=${element.imagen} alt=${element.nombre}>
                <div class="card-body carta__cuerpo">
                  <h2 class="carta__cuerpo__titulo">${element.nombre}</h2>
                  <p class="card-text carta__cuerpo__texto">${element.descripcion}</p>
                  <p class="card-text carta__cuerpo__texto">$ ${element.precio}</p>
                  <button class="btn carta__cuerpo__boton agregar_carrito" id="${element.id}" >Agregar al carrito</button>
                </div>
            </div>
        `
    },"")
    contenedorCartas.innerHTML = cards
}
fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        crearCartas(data); 
    })
    .catch((error) => {
        console.error("Error al obtener datos desde el servidor:", error);
    });

ordenarCards.addEventListener("change", () => {
    const valorSeleccionado = ordenarCards.value 
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        let arrayOrdenado = [...data]
        if (valorSeleccionado === "za"){
            arrayOrdenado.sort((a,b) => b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase()))  
        } else if (valorSeleccionado === "ofertas"){
            arrayOrdenado = arrayOrdenado.filter((element) => element.oferta === true)
        } else if(valorSeleccionado === "az"){
            arrayOrdenado.sort((a,b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()))
        } 
            else {
            crearCartas(arrayOrdenado)
        }
        crearCartas(arrayOrdenado)
    })
    .catch((error) =>{
        console.error("Error al obtener datos desde el servidor:",error)
    })
})
crearCartas([])