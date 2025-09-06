//Es para definir las unidades de medida
const datosUnidad = {
    "meses": "Meses",
    "años": "Años"
};

//Es para poblar el select de unidad de medida
const poblarUnidades = () => {
    let seleccionarUnidad = document.getElementById("seleccionar-unidad");
    for (const unidad in datosUnidad) {
        let opcion = document.createElement("option");
        opcion.value = unidad;
        opcion.text = datosUnidad[unidad];
        seleccionarUnidad.appendChild(opcion);
    }
};

//Es para poblar el select de unidad de medida al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(poblarUnidades, 100);
});