// Contador de fotos
let contadorFotos = 1;

// Es para agregar otra foto
function agregarOtraFoto() {
    if (contadorFotos >= 5) {
        alert('Máximo 5 fotos permitidas');
        return;
    }
    
   contadorFotos = contadorFotos + 1;
    
    // Es para crear un nuevo input
    const nuevaEntrada = document.createElement('input');
    nuevaEntrada.type = 'file';
    nuevaEntrada.name = 'fotos';
    nuevaEntrada.accept = 'image/*,.pdf';

    //Es para insertar después del input principal
    const entradaFotos = document.getElementById('fotos');
    entradaFotos.parentNode.insertBefore(nuevaEntrada, entradaFotos.nextSibling);
}

// Es para modificar la validación
function modificarValidacionArchivos() {
    // Quitar required
    document.getElementById('fotos').required = false;
    
    // Guarda la función original
    const validacionOriginal = window.validarFotos;

    // Crea la nueva validación
    window.validarFotos = function() {
        // Obtener todos los inputs
        const inputs = document.querySelectorAll('input[name="fotos"]');
        const archivos = [];
        
        // Junta todos los archivos
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].files.length > 0) {
                for (let j = 0; j < inputs[i].files.length; j++) {
                    archivos.push(inputs[i].files[j]);
                }
            }
        }
        
        // Verifica si hay archivos
        if (archivos.length === 0) return false;
        
        // Usa la validación original
        return validacionOriginal(archivos);
    };
}

// Agrega el botón
function agregarBotonFoto() {
    var entradaFotos = document.getElementById('fotos');
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = 'Agregar otra foto';
    boton.onclick = agregarOtraFoto;
    
    // Insertar botón
    entradaFotos.parentNode.insertBefore(boton, entradaFotos.nextSibling);
}

// Iniciar cuando cargue la página
window.onload = function() {
    document.getElementById('fotos').required = false;
    agregarBotonFoto();
    modificarValidacionArchivos();
};