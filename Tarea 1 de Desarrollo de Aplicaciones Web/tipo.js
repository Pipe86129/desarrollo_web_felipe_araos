// Datos de las opciones de tipo
const datosTipo = {
    "perro": "Perro",
    "gato": "Gato"
};

// Es una función para poblar el select de tipo
const poblarTipos = () => {
    let seleccionarTipo = document.getElementById("seleccionar-tipo");
    for (const tipo in datosTipo) {
        let opcion = document.createElement("option"); // ← Corregido aquí
        opcion.value = tipo;
        opcion.text = datosTipo[tipo];
        seleccionarTipo.appendChild(opcion);
    }
};

// Event listener para cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(poblarTipos, 100);
});