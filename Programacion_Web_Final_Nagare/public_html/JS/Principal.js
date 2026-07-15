//===========================
// MENU HAMBURGUESA
//===========================

const btnMenu = document.getElementById("btnMenu");

const menu = document.querySelector(".nagare-navbar");

btnMenu.addEventListener("click",function(){

    menu.classList.toggle("activo");

});

// ==========================================================================
// CONTROL DE MODALES INTERACTIVOS - NAGARE COFFEE & MATCHA
// ==========================================================================

// Función para abrir cualquier modal por su ID
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "block";
    }
}

// Función para cerrar un modal específico
function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "none";
    }
}

// Cerrar el modal automáticamente si el usuario hace clic fuera de la caja blanca
window.onclick = function(event) {
    if (event.target.classList.contains('nagare-modal')) {
        event.target.style.display = "none";
    }
}

// Procesar el envío de datos del formulario de reserva
function procesarFormulario(event, mensajeExito) {
    event.preventDefault(); // Evita que la página se recargue
    
    // Simulación de guardado de datos
    alert("✨ ¡Nagare Coffee & Matcha!\n" + mensajeExito);
    
    // Cerrar el modal de reserva automáticamente
    cerrarModal('modal-reservar');
    
    // Limpiar el formulario
    event.target.reset();
}