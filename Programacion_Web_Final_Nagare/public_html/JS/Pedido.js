//===========================
// MENU HAMBURGUESA
//===========================

const btnMenu = document.getElementById("btnMenu");

const menu = document.querySelector(".nagare-navbar");

btnMenu.addEventListener("click",function(){

    menu.classList.toggle("activo");

});

function calcularPedido() {
    
    // --- PUNTO 3: DECLARACIÓN, MANEJO E INICIALIZACIÓN DE VARIABLES ---
    // --- PUNTO 1: DECLARACIÓN DE TIPOS DE DATOS (String, Number) ---
    const selectProducto = document.getElementById("producto");
    const selectPago = document.getElementById("pago");
    
    let precioUnitario = Number(selectProducto.value);           // Tipo: Number
    let cantidad = Number(document.getElementById("cantidad").value); // Tipo: Number
    let codigoCupon = document.getElementById("cupon").value.trim().toUpperCase(); // Tipo: String
    let metodoPago = selectPago.value;                          // Tipo: String
    
    let subtotal = 0;   // Inicialización
    let igv = 0;        // Inicialización
    let descuento = 0;  // Inicialización
    let recargo = 0;    // Inicialización
    let total = 0;      // Inicialización

    // --- PUNTO 2: USO DE OPERADORES MATEMÁTICOS (Multiplicación *) ---
    subtotal = precioUnitario * cantidad;

    // --- PUNTO 4: ESTRUCTURAS DE CONTROL SIMPLE, DOBLE Y ANIDADA ---
    
    // Estructura de Control Simple: Validación básica de seguridad
    if (cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida igual o mayor a 1.");
        return;
    }

    // Estructura de Control Doble: Evaluación del cupón de descuento
    if (codigoCupon === "NAGARE10") {
        // Operadores matemáticos (Multiplicación y División)
        descuento = subtotal * 0.10; // 10% de descuento directo al subtotal
    } else {
        descuento = 0; // Sin descuento si el código es incorrecto o está vacío
    }

    // Estructura de Control Anidada: Evaluación de tasas por método de pago
    // (Se calcula sobre el subtotal ya afectado por el descuento)
    let baseConDescuento = subtotal - descuento;

    if (metodoPago === "Tarjeta") {
        recargo = baseConDescuento * 0.05; // Las tarjetas de crédito/débito tienen un recargo del 5%
    } else {
        // Anidamiento dentro de la estructura falsa
        if (metodoPago === "Yape" || metodoPago === "Plin") {
            recargo = 0; // Billeteras digitales sin recargo
        } else {
            recargo = 0; // Efectivo sin recargo
        }
    }

    // --- OPERADORES MATEMÁTICOS COMBINADOS (Suma +, Resta -, División /) ---
    // Como el precio de carta ya incluye IGV, desglosamos el impuesto de ley correctamente:
    let baseImponible = baseConDescuento / 1.18; 
    igv = baseConDescuento - baseImponible; // El IGV real extraído del monto neto de consumo
    
    // El total final es lo que se consume (ya con descuento) más el recargo de la tarjeta
    total = baseConDescuento + recargo;

    // --- ACTUALIZACIÓN DE LA INTERFAZ DE USUARIO (DOM) ---
    document.getElementById("subtotal").innerText = "Subtotal: S/. " + subtotal.toFixed(2);
    document.getElementById("igv").innerText = "IGV (18%): S/. " + igv.toFixed(2);
    document.getElementById("descuento").innerText = "Descuento: S/. " + descuento.toFixed(2);
    
    // Mostramos si hubo recargo de forma detallada mediante control doble
    if (recargo > 0) {
        document.getElementById("metodo").innerText = "Método de pago: " + metodoPago + " (Incluye +5% recargo)";
    } else {
        document.getElementById("metodo").innerText = "Método de pago: " + metodoPago;
    }
    
    document.getElementById("total").innerText = "Total: S/. " + total.toFixed(2);
}

/**
 * Función secundaria para confirmar la transacción
 */
function confirmarPedido() {
    const totalTexto = document.getElementById("total").innerText;
    
    // Estructura de control doble para verificar si ya se ejecutó el cálculo previo
    if (totalTexto === "Total: S/. 0.00") {
        alert("⚠️ Primero debe calcular el total de su pedido antes de confirmar.");
    } else {
        alert("✨ ¡Pedido Procesado con Éxito!\nSu orden ya está en preparación. Gracias por elegir Nagare Coffee.");
    }
}