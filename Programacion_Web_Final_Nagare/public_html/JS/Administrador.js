// ==========================================================================
// ARREGLOS E INGENIERÍA LOGICA - PANEL DE CONTROL
// ==========================================================================

let ARRAY01 = []; // Arreglo original
let ARRAY02 = []; // Arreglo final ordenado
let maxTamano = 0;
let vistaActual = 'original'; // 'original' o 'final'

// 1. FUNCIÓN OBJETO: Constructor para la creación y estandarización de datos
function Producto(codigo, nombre, categoria, precio, stock) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = parseFloat(precio).toFixed(2);
    this.stock = parseInt(stock);
}

// Inicializa las restricciones del Array01
function inicializarArray() {
    const inputTam = document.getElementById("tamano-array");
    const tam = parseInt(inputTam.value);

    if (isNaN(tam) || tam <= 0) {
        alert("Por favor, ingrese un tamaño válido y mayor a 0.");
        return;
    }

    maxTamano = tam;
    ARRAY01 = [];
    ARRAY02 = [];
    
    document.getElementById("setup-arreglo").style.display = "none";
    document.getElementById("panel-principal").classList.remove("disabled-panel");
    actualizarTabla();
}

// 2. MENÚ OPCIÓN: INGRESAR
function menuIngresar() {
    if (ARRAY01.length >= maxTamano) {
        alert(`🚨 Límite alcanzado. El Array01 solo permite almacenar ${maxTamano} elementos.`);
        return;
    }

    const cod = document.getElementById("codigo").value.trim();
    const nom = document.getElementById("nombre").value.trim();
    const cat = document.getElementById("categoria").value;
    const pre = document.getElementById("precio").value;
    const sto = document.getElementById("stock").value;

    if (!cod || !nom || !cat || !pre || !sto) {
        alert("Todos los campos son obligatorios para construir el objeto.");
        return;
    }

    // Instancia del objeto mediante función constructora
    const nuevoProducto = new Producto(cod, nom, cat, pre, sto);
    ARRAY01.push(nuevoProducto);

    // Limpiar inputs
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";

    vistaActual = 'original';
    actualizarBotonesVista();
    actualizarTabla();
}

// 3. MENÚ OPCIÓN: MOSTRAR SALIDA DE DATOS
function actualizarTabla(datosAMostrar = null) {
    const tbody = document.getElementById("listaProductos");
    const contador = document.getElementById("contador");
    const titulo = document.getElementById("titulo-tabla");
    
    let arregloActual = datosAMostrar ? datosAMostrar : (vistaActual === 'original' ? ARRAY01 : ARRAY02);
    
    titulo.innerText = datosAMostrar ? "Resultado de la Búsqueda" : 
                      (vistaActual === 'original' ? "Mostrando: (Datos Originales)" : "Mostrando: (Final Ordenado por Burbuja)");
    
    contador.innerText = `Productos: ${ARRAY01.length} / ${maxTamano}`;
    tbody.innerHTML = "";

    if (arregloActual.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="nagare-table-empty">No hay registros para desplegar aquí.</td></tr>`;
        return;
    }

    arregloActual.forEach((prod, indice) => {
        // Encontrar índice real en ARRAY01 para la eliminación
        const indiceReal = ARRAY01.indexOf(prod);
        
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><code>${prod.codigo}</code></td>
            <td><strong>${prod.nombre}</strong></td>
            <td><span class="nagare-badge-cat">${prod.categoria}</span></td>
            <td>$${prod.precio}</td>
            <td>${prod.stock} u.</td>
            <td>
                <button onclick="menuEliminar(${indiceReal})" class="nagare-btn-action-delete" title="Eliminar Objeto">🗑️</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// 3. MENÚ OPCIÓN: BUSCAR
function menuBuscar() {
    const query = document.getElementById("buscar").value.toLowerCase().trim();
    if (!query) {
        actualizarTabla();
        return;
    }

    const filtrados = ARRAY01.filter(p => p.nombre.toLowerCase().includes(query));
    actualizarTabla(filtrados);
}

// 3. MENÚ OPCIÓN: ELIMINAR
function menuEliminar(indice) {
    if (indice === -1) return;
    
    if (confirm(`¿Está seguro de eliminar el producto "${ARRAY01[indice].nombre}" de la memoria?`)) {
        ARRAY01.splice(indice, 1);
        // Regenerar ARRAY02 vacío tras alteración del original
        ARRAY02 = []; 
        vistaActual = 'original';
        actualizarBotonesVista();
        actualizarTabla();
    }
}

// 4. MÉTODOS DE ORDENACIÓN: BURBUJA CLÁSICO (Hacia ARRAY02)
function menuOrdenarBurbuja() {
    if (ARRAY01.length === 0) {
        alert("El Array01 se encuentra vacío. No hay objetos que ordenar.");
        return;
    }

    // 5. Clonación profunda hacia el ARRAY02 para salvaguardar el original
    ARRAY02 = ARRAY01.map(p => ({ ...p }));

    // Algoritmo de la Burbuja
    let n = ARRAY02.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Comparación de cadenas de caracteres por nombre
            if (ARRAY02[j].nombre.localeCompare(ARRAY02[j + 1].nombre) > 0) {
                // Intercambio (Swap)
                let temp = ARRAY02[j];
                ARRAY02[j] = ARRAY02[j + 1];
                ARRAY02[j + 1] = temp;
            }
        }
    }

    alert("🔮 ¡Productos ordenados mediante Burbuja con éxito! Los resultados se han guardado.");
    vistaActual = 'final';
    actualizarBotonesVista();
    actualizarTabla();
}

// Controles auxiliares de Interface de navegación
function alternarVista(vista) {
    vistaActual = vista;
    actualizarBotonesVista();
    actualizarTabla();
}

function actualizarBotonesVista() {
    document.getElementById("btn-v-orig").classList.toggle("active", vistaActual === 'original');
    document.getElementById("btn-v-final").classList.toggle("active", vistaActual === 'final');
}

function cerrarSesion() {
    if (confirm("¿Desea salir del panel administrativo?")) {
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = "login.html";
    }
}