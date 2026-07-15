//===========================
// MENU HAMBURGUESA
//===========================

const btnMenu = document.getElementById("btnMenu");

const menu = document.querySelector(".nagare-navbar");

btnMenu.addEventListener("click",function(){

    menu.classList.toggle("activo");

});


// ==========================================================================
// MOTOR DE RESPONSIVIDAD DINÁMICA POR JAVASCRIPT (NAGARE ENGINE)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const contenedorNosotros = document.getElementById("nosotros");
    const gridInformacion = document.getElementById("nagare-info-grid");
    const seccionValores = document.getElementById("nagare-valores");

    if (!contenedorNosotros) return;

    /**
     * Evalúa el ancho actual del componente y gestiona la UI
     * @param {number} widthAncho - Ancho en píxeles del elemento
     */
    function procesarCambioTamano(widthAncho) {
        // Estado Móvil (Menor o igual a 650px)
        if (widthAncho <= 650) {
            contenedorNosotros.classList.add("js-modo-movil");
            contenedorNosotros.classList.remove("js-modo-tablet");
        } 
        // Estado Tableta (Entre 651px y 992px)
        else if (widthAncho > 650 && widthAncho <= 992) {
            contenedorNosotros.classList.add("js-modo-tablet");
            contenedorNosotros.classList.remove("js-modo-movil");
        } 
        // Estado Escritorio (Mayor a 992px)
        else {
            contenedorNosotros.classList.remove("js-modo-movil");
            contenedorNosotros.classList.remove("js-modo-tablet");
        }
    }

    // Usamos ResizeObserver: La API moderna más eficiente para escuchar contenedores alternos al window
    const observadorEstructura = new ResizeObserver(entries => {
        for (let entry of entries) {
            // Obtenemos el ancho del cuadro de contenido del elemento observado
            const anchoActual = entry.contentRect.width;
            procesarCambioTamano(anchoActual);
        }
    });

    // Iniciamos la escucha activa sobre la sección maestra
    observadorEstructura.observe(contenedorNosotros);
});