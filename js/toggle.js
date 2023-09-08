const toggle = document.getElementById("contenedor_toggle")
const cuerpo = document.querySelector("body")
const textop = document.querySelectorAll(".modo_claro")

toggle.onclick = function () {
    toggle.classList.toggle("active")
    cuerpo.classList.toggle("active")
    textop.forEach(parrafo => {
        parrafo.classList.toggle("active")
    })
    if ( document.body.classList.contains("active")){
        localStorage.setItem("active","true")
    } else{
        localStorage.setItem("active", "false")
    }
}

if (localStorage.getItem("active") === "true"){
    document.body.classList.add("active")
    cuerpo.classList.add("active")
    textop.forEach(parrafo => {
        parrafo.classList.add("active")
    })
}else{
    document.body.classList.remove("active")
    cuerpo.classList.remove("active")
    textop.forEach(parrafo => {
        parrafo.classList.remove("active")
    })
}