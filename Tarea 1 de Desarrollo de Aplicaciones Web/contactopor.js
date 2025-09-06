// Datos de las opciones de contacto
const datosContacto = {
    "whatsApp": "Número de WhatsApp (ej: +34123456789)",
    "telegram": "Usuario de Telegram (ej: @usuario)",
    "x": "Usuario de X (ej: @usuario)",
    "instagram": "Usuario de Instagram (ej: @usuario)",
    "tiktok": "Usuario de TikTok (ej: @usuario)",
    "otra": "URL o ID de contacto"
};

// Función para poblar el select de contacto
const poblarContactos = () => {
    let seleccionarContacto = document.getElementById("seleccionar-contacto");
    for (const contacto in datosContacto) {
        let opcion = document.createElement("option");
        opcion.value = contacto;
        opcion.text = contacto.charAt(0).toUpperCase() + contacto.slice(1);
        seleccionarContacto.appendChild(opcion);
    }
};

// Función para actualizar el campo de información de contacto
const actualizarInfoContacto = () => {
    let seleccionarContacto = document.getElementById("seleccionar-contacto");
    let contenedorInfo = document.getElementById("contenedor-info-contacto");
    let contactoSeleccionado = seleccionarContacto.value;
    
    // Limpiar el contenedor
    contenedorInfo.innerHTML = '';
    
    if (datosContacto[contactoSeleccionado]) {
        // Crear el input
        let entrada = document.createElement("input");
        entrada.type = contactoSeleccionado === "whatsapp" ? "tel" : "text";
        entrada.name = "contact-info";
        entrada.placeholder = datosContacto[contactoSeleccionado];
        entrada.minLength = 4;
        entrada.maxLength = 50;
        entrada.required = false; // Hacerlo opcional
        
        // Añadir input al contenedor
        contenedorInfo.appendChild(entrada);
    }
};

// Event listeners
document.getElementById("seleccionar-contacto").addEventListener("change", actualizarInfoContacto);

document.addEventListener('DOMContentLoaded', poblarContactos);