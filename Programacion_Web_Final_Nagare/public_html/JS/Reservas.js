//===========================
// MENU HAMBURGUESA
//===========================

const btnMenu = document.getElementById("btnMenu");

const menu = document.querySelector(".nagare-navbar");

btnMenu.addEventListener("click",function(){

    menu.classList.toggle("activo");

});

function procesarReserva(event) {
    event.preventDefault(); // Detiene el refresco nativo del navegador
    
    // Extracción de datos limpia
    const nombre = document.getElementById("reserva-nombre").value;
    const fecha = document.getElementById("reserva-fecha").value;
    const hora = document.getElementById("reserva-hora").value;
    const personas = document.getElementById("reserva-personas").value;
    const zona = document.getElementById("reserva-zona").value;

    // Alerta de confirmación de software premium
    alert(`✨ ¡Reserva Confirmada con Éxito!\n\nHola ${nombre}, hemos asegurado una mesa para ${personas} personas en la zona "${zona}" el día ${fecha} a las ${hora}.\n\nTe enviamos un código de confirmación a tu correo.`);
    
    event.target.reset(); // Limpia los campos del formulario automáticamente
}