
// Es para validar el nombre (debe tener entre 3 y 200 caracteres)
const validarNombre = (nombre) => {
  if(!nombre) return false;
  let longitudValida = nombre.trim().length >= 3 && nombre.trim().length <= 200;
  return longitudValida;
}

const validarEmail = (email) => {
  if (!email) return false;
  let longitudValida = email.length < 100;

  //Es para validar el formato del email
  let expresion = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatoValido = expresion.test(email);

  //Es para retornar si ambas validaciones son correctas
  return longitudValida && formatoValido;
};

const validarTelefono = (telefono) => {
  if (!telefono || telefono.trim() === '') return true;

  //Es para validar el formato del teléfono (debe comenzar con + y tener 11 dígitos en total)
  let expresion = /^\+\d{11}$/;
  return expresion.test(telefono);
};

const validarFotos = (fotos) => {
  // Es para validar que haya al menos una foto
  if (!fotos || !fotos.length || fotos.length === 0) return false;

  //Es para validar que la cantidad de fotos esté entre 1 y 5
  let longitudValida = fotos.length >= 1 && fotos.length <= 5;

  // es para validar el tipo de archivo
  let tipoValido = true;

  for (const archivo of fotos) {
    //Es para validar que el archivo sea una imagen o un PDF
    let familiaArchivo = archivo.type.split("/")[0];
    tipoValido = tipoValido && (familiaArchivo == "image" || archivo.type == "application/pdf");
  }

  return longitudValida && tipoValido;
};

const validarSeleccion = (seleccion) => {
  if(!seleccion) return false;
  return true
}

const validarSeleccionOpcional = (seleccion) => {
  return true
}

// es para validar la fecha (debe ser al menos 3 horas en el futuro)
const validarFecha = (fecha) => {
  if (!fecha) return false;
  
  // es para validar el formato de la fecha y hora 
  const expresion = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  if (!expresion.test(fecha)) return false;
  
  //es para convertir a objeto Date y comparar
  const fechaSeleccionada = new Date(fecha);
  const fechaActual = new Date();
  
  //Es para calcular la fecha mínima (3 horas en el futuro)
  const fechaMinima = new Date(fechaActual.getTime() + 3 * 60 * 60 * 1000);
  
  //Es para validar que la fecha seleccionada sea al menos 3 horas en el futuro
  return fechaSeleccionada >= fechaMinima;
};

//Es para validar la cantidad (debe ser un número entero positivo, mínimo 1)
const validarCantidad = (cantidad) => {
  if (!cantidad) return false;
  
  // Es para convertir a número entero
  const cantidadNumerica = parseInt(cantidad);
  
  // Es para validar que sea un número entero positivo, mínimo 1
  return Number.isInteger(cantidadNumerica) && cantidadNumerica >= 1;
};

const validarSector = (sector) => {
  //Es para validar que el sector no exceda 100 caracteres si tiene contenido
  if (!sector || sector.trim() === '') return true;
  
  // Es para validar la longitud máxima
  return sector.length <= 100;
};

const validarDescripcion = (descripcion) => {
  // Si está vacío (es opcional)
  if (!descripcion || descripcion.trim() === '') return true;
  
  // Si tiene contenido, no necesita validación adicional
  return true;
};

const validarFormulario = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let formulario = document.forms["formulario"];
  let email = formulario["email"].value;
  let telefono = formulario["telefono"].value;
  let nombre = formulario["nombre"].value;
  let fotos = formulario["fotos"].files;
  let region = formulario["seleccionar-region"].value;
  let comuna = formulario["seleccionar-comuna"].value;
  let sector = formulario["sector"].value;
  let contacto = formulario["seleccionar-contacto"].value;
  let tipo = formulario["seleccionar-tipo"].value;
  let unidad = formulario["seleccionar-unidad"].value;
  let fecha = formulario["fecha"].value;
  let cantidad = formulario["cantidad"].value;
  let edad = formulario["edad"].value;
  let descripcion = formulario["comentarios"].value;

  // variables auxiliares de validación y función.
  let entradasInvalidas = [];
  let esValido = true;
  const establecerEntradaInvalida = (nombreEntrada) => {
    entradasInvalidas.push(nombreEntrada);
    esValido &&= false;
  };
  
  // lógica de validación
  if (!validarNombre(nombre)) {
    establecerEntradaInvalida("Nombre");
  }
  if (!validarEmail(email)) {
    establecerEntradaInvalida("Email");
  }
  if (!validarTelefono(telefono)) {
    establecerEntradaInvalida("Teléfono");
  }
  if (!validarFotos(fotos)) {
    establecerEntradaInvalida("Fotos");
  }
  if (!validarSeleccion(region)) {
    establecerEntradaInvalida("Región");
  }
  if (!validarSeleccion(comuna)) {
    establecerEntradaInvalida("Comuna");
  }
  if (!validarSector(sector)) {
    establecerEntradaInvalida("Sector");
  }
  if (!validarSeleccionOpcional(contacto)) {
    establecerEntradaInvalida("Contactar");
  }
  if (!validarSeleccion(tipo)) {
    establecerEntradaInvalida("Tipo");
  }
  if (!validarSeleccion(unidad)) {
    establecerEntradaInvalida("Unidad");
  }
  if (!validarFecha(fecha)) {
    establecerEntradaInvalida("Fecha");
  }
  if (!validarCantidad(cantidad)) {
    establecerEntradaInvalida("Cantidad");
  }
  if (!validarCantidad(edad)) {
    establecerEntradaInvalida("Edad");
  }
  if (!validarDescripcion(descripcion)) {
    establecerEntradaInvalida("Descripción");
  }

  // finalmente mostrar la validación
  let cajaValidacion = document.getElementById("caja-validacion");
  let elementoMensajeValidacion = document.getElementById("mensaje-validacion");
  let elementoListaValidacion = document.getElementById("lista-validacion");
  let contenedorFormulario = document.querySelector(".contenedor-principal");

  if (!esValido) {
    elementoListaValidacion.textContent = "";
    // agregar elementos inválidos al elemento lista-validacion.
    for (entrada of entradasInvalidas) {
      let elementoLista = document.createElement("li");
      elementoLista.innerText = entrada;
      elementoListaValidacion.append(elementoLista);
    }
    // establecer mensaje-validacion
    elementoMensajeValidacion.innerText = "Los siguientes campos son inválidos:";

    // aplicar estilos de error
    cajaValidacion.style.backgroundColor = "#ffdddd";
    cajaValidacion.style.borderLeftColor = "#f44336";

    // hacer visible el mensaje de validación
    cajaValidacion.hidden = false;
  } else {
    // Ocultar el formulario
    formulario.style.display = "none";

    // establecer mensaje de éxito
    elementoMensajeValidacion.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    elementoListaValidacion.textContent = "";

    // aplicar estilos de éxito
    cajaValidacion.style.backgroundColor = "#ddffdd";
    cajaValidacion.style.borderLeftColor = "#4CAF50";

    // Agregar botones para enviar el formulario o volver
    let botonEnviar = document.createElement("button");
    botonEnviar.innerText = "Sí, estoy seguro";
    botonEnviar.style.marginRight = "10px";
    botonEnviar.addEventListener("click", () => {
      // Cambiar mensaje
      elementoMensajeValidacion.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
      
      // Limpiar botones anteriores
      elementoListaValidacion.textContent = "";
      
      // Crear botón para volver a la portada
      let botonInicio = document.createElement("button");
      botonInicio.innerText = "Volver a la portada";
      botonInicio.addEventListener("click", () => {
          window.location.href = "portada.html";
      });
      
      elementoListaValidacion.appendChild(botonInicio);
    });

    let botonVolver = document.createElement("button");
    botonVolver.innerText = "No, no estoy seguro, quiero volver al formulario.";
    botonVolver.addEventListener("click", () => {
      // Mostrar el formulario nuevamente
      formulario.style.display = "block";
      cajaValidacion.hidden = true;
    });

    elementoListaValidacion.appendChild(botonEnviar);
    elementoListaValidacion.appendChild(botonVolver);

    // hacer visible el mensaje de validación
    cajaValidacion.hidden = false;
  }
};

let botonEnviar = document.getElementById("boton-enviar");
botonEnviar.addEventListener("click", validarFormulario);