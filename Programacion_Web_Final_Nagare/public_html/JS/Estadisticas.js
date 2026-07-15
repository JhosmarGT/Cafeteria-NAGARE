// Arreglo principal de almacenamiento de instancias
let listaProductosObjetos = [];

// CLASES: Modelo de datos para la instanciación de productos
class Producto {
    constructor(codigo, nombre, cantidad, precio) {
        this.codigo = codigo.toUpperCase();
        this.nombre = nombre;
        this.cantidad = parseInt(cantidad);
        this.precio = parseFloat(precio).toFixed(2);
    }
}

// Entrada de datos del Menú
function menuIngresar() {
    const cod = document.getElementById("codigo").value.trim();
    const nom = document.getElementById("nombre").value.trim();
    const can = document.getElementById("cantidad").value;
    const pre = document.getElementById("precio").value;

    if (!cod || !nom || !can || !pre) {
        alert("Todos los campos son requeridos.");
        return;
    }

    if (listaProductosObjetos.some(p => p.codigo === cod.toUpperCase())) {
        alert("Error: Ya existe un producto registrado con ese mismo código.");
        return;
    }

    const nuevoProducto = new Producto(cod, nom, can, pre);
    listaProductosObjetos.push(nuevoProducto);

    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";

    procesarYMostrarMatriz();
}

function procesarYMostrarMatriz(datosFiltrados = null) {
    let fuenteDatos = datosFiltrados ? datosFiltrados : listaProductosObjetos;
    let matrizBidimensional = [];
    
    fuenteDatos.forEach(producto => {
        let fila = [producto.codigo, producto.nombre, producto.cantidad, producto.precio];
        matrizBidimensional.push(fila);
    });

    renderizarMatrizHTML(matrizBidimensional);
    actualizarIndicadores();
}

// SALIDA DE DATOS CON NAVEGACIÓN ENTRE NODOS ELEMENTO
function renderizarMatrizHTML(matriz) {
    const tbody = document.getElementById("tablaProductos");
    tbody.innerHTML = "";

    if (matriz.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="nagare-table-empty">La matriz se encuentra vacía.</td></tr>`;
        return;
    }

    for (let i = 0; i < matriz.length; i++) {
        const filaTR = document.createElement("tr");

        filaTR.innerHTML = `
            <td><code>${matriz[i][0]}</code></td>
            <td><strong>${matriz[i][1]}</strong></td>
            <td>${matriz[i][2]} unidades</td>
            <td>$${matriz[i][3]}</td>
            <td>
                <!-- Se pasa 'this' (el botón actual) como argumento para la navegación de nodos -->
                <button onclick="menuEliminarConNodos(this)" class="nagare-btn-delete" title="Eliminar Objeto">🗑️</button>
            </td>
        `;
        tbody.appendChild(filaTR);
    }
}

// IMPLEMENTACIÓN DE NAVEGACIÓN ENTRE NODOS (DOM TRAVERSAL)
function menuEliminarConNodos(botonPresionado) {
    // 1. Navegamos hacia el nodo elemento padre contenedor 'td' -> luego al padre 'tr'
    const nodoCelda = botonPresionado.parentElement;
    const nodoFila = nodoCelda.parentElement;
    
    // 2. Usamos la propiedad .children para obtener los elementos hermanos (Nodos tipo Elemento)
    const codigoProducto = nodoFila.children[0].firstElementChild.innerText; 
    const nombreProducto = nodoFila.children[1].firstElementChild.innerText;

    // Ejecutamos lógica con los datos capturados dinámicamente desde los nodos visuales
    if (confirm(`¿Desea eliminar de forma permanente [${codigoProducto}] - ${nombreProducto}?`)) {
        const indice = listaProductosObjetos.findIndex(p => p.codigo === codigoProducto);
        if (indice !== -1) {
            listaProductosObjetos.splice(indice, 1);
            procesarYMostrarMatriz();
        }
    }
}

// BÚSQUEDAS Y ORDENAMIENTO (Burbuja)
function menuBuscarPorCodigo() {
    const codBuscar = document.getElementById("buscar-codigo").value.toUpperCase().trim();
    if (!codBuscar) { procesarYMostrarMatriz(); return; }
    const resultado = listaProductosObjetos.filter(p => p.codigo === codBuscar);
    procesarYMostrarMatriz(resultado);
}

function menuBuscarPorNombre() {
    const nomBuscar = document.getElementById("buscar-nombre").value.toLowerCase().trim();
    if (!nomBuscar) { procesarYMostrarMatriz(); return; }
    const resultado = listaProductosObjetos.filter(p => p.nombre.toLowerCase().includes(nomBuscar));
    procesarYMostrarMatriz(resultado);
}

function menuOrdenarBurbuja() {
    let n = listaProductosObjetos.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (listaProductosObjetos[j].codigo.localeCompare(listaProductosObjetos[j + 1].codigo) > 0) {
                let temporal = listaProductosObjetos[j];
                listaProductosObjetos[j] = listaProductosObjetos[j + 1];
                listaProductosObjetos[j + 1] = temporal;
            }
        }
    }
    procesarYMostrarMatriz();
}

// CONTROLES DE LA VENTANA MODAL RESPONSIVA
function abrirModalAyuda() {
    document.getElementById("modalAyuda").classList.add("modal-active");
}

function cerrarModalAyuda() {
    document.getElementById("modalAyuda").classList.remove("modal-active");
}

function mostrarEstructuraCompleta() {
    document.getElementById("buscar-codigo").value = "";
    document.getElementById("buscar-nombre").value = "";
    procesarYMostrarMatriz();
}

function actualizarIndicadores() {
    let totalProd = listaProductosObjetos.length;
    let totalStock = listaProductosObjetos.reduce((acc, p) => acc + p.cantidad, 0);
    let valorInv = listaProductosObjetos.reduce((acc, p) => acc + (p.cantidad * p.precio), 0);

    document.getElementById("cantidadProductos").innerText = totalProd;
    document.getElementById("totalInventario").innerText = `${totalStock} u.`;
    document.getElementById("valorTotal").innerText = `$${valorInv.toFixed(2)}`;
}

function reiniciarSistema() {
    if (confirm("¿Estás seguro de vaciar toda la memoria de datos?")) {
        listaProductosObjetos = [];
        procesarYMostrarMatriz();
    }
}