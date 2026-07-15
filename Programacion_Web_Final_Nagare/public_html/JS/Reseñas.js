//===========================
// MENU HAMBURGUESA
//===========================

const btnMenu = document.getElementById("btnMenu");

const menu = document.querySelector(".nagare-navbar");

btnMenu.addEventListener("click",function(){

    menu.classList.toggle("activo");

});

// ==========================================================================
// MOTOR DE RESPONSIVIDAD PARA COMPONENTES TABULARES - NAGARE ENGINE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Apuntamos al contenedor padre de la sección de reseñas
    const seccionResenas = document.getElementById("resenas-section");

    if (!seccionResenas) return;

    /**
     * Alterna la clase adaptativa según el espacio físico real
     * @param {number} anchoContenedor - Ancho en píxeles
     */
    function controlarLayoutTabla(anchoContenedor) {
        // Punto de quiebre óptimo para tablas multimedia (768px)
        if (anchoContenedor <= 768) {
            seccionResenas.classList.add("js-resenas-movil");
        } else {
            seccionResenas.classList.remove("js-resenas-movil");
        }
    }

    // Instanciamos el observador de tamaño de elementos
    const observadorEstructura = new ResizeObserver(entries => {
        for (let entry of entries) {
            const anchoActual = entry.contentRect.width;
            controlarLayoutTabla(anchoActual);
        }
    });

    // Ejecutamos la vigilancia activa sobre el elemento
    observadorEstructura.observe(seccionResenas);
});