const formulario = document.querySelector(".formulario")
const resultado = document.querySelector(".resultado")

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombre = formulario.nombre.value
    const email = formulario.email.value
    const mensaje = formulario.mensaje.value

    function validarEmail(correo) {
        let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return regex.test(correo);
    }
    console.log(validarEmail(email))

    if (nombre.length < 3){
        resultado.textContent = "El nombre debe tener al menos 3 caracteres"
    } else if (!validarEmail(email)){
        resultado.textContent = "El correo electronico no es valido "
    } else if  (mensaje.length === 0){
        resultado.textContent = "debes escribir un mensaje"
    } else{
        Swal.fire({
            iconColor : '#17FD03',
            confirmButtonColor:"#17FD03",
            color :'#17FD03',
            icon: 'success',
            background : '#000',
            title: 'Su mensaje fue enviado, le respoderemos en la brevedad',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          resultado.textContent = ""
    }
})