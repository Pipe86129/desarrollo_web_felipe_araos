//CONTENIDO DEL VALIDADOR DE contactopor.js
// Datos de las opciones de contacto
const datosContacto = {
    "whatsapp": "Número de WhatsApp (ej: +34123456789)",
    "telegram": "Usuario de Telegram (ej: @usuario)",
    "x": "Usuario de X (ej: @usuario)",
    "instagram": "Usuario de Instagram (ej: @usuario)",
    "tiktok": "Usuario de TikTok (ej: @usuario)",
    "otra": "URL o ID de contacto"
};

// Es la función para poblar los checkboxes de contacto
const poblarContactos = () => {
    let contenedorContactos = document.getElementById("contenedor-contactos");
    if (!contenedorContactos) return;
    
    // Limpiar contenedor
    contenedorContactos.innerHTML = '';
    
    for (const contacto in datosContacto) {
        let div = document.createElement("div");
        div.style.margin = "8px 0";
        div.style.padding = "5px";
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "contacto_tipo[]";
        checkbox.value = contacto;
        checkbox.id = "contacto-" + contacto;
        checkbox.style.marginRight = "8px";
        
        let label = document.createElement("label");
        label.htmlFor = "contacto-" + contacto;
        label.textContent = contacto.charAt(0).toUpperCase() + contacto.slice(1);
        label.style.cursor = "pointer";
        
        div.appendChild(checkbox);
        div.appendChild(label);
        contenedorContactos.appendChild(div);
    }
};

// Es la función para actualizar los campos de información de contacto
const actualizarInfoContacto = () => {
    let contenedorInfo = document.getElementById("contenedor-info-contacto");
    if (!contenedorInfo) return;
    
    contenedorInfo.innerHTML = '';
    
    // Es para obtener todos los checkboxes seleccionados
    let checkboxes = document.querySelectorAll('input[name="contacto_tipo[]"]:checked');
    
    if (checkboxes.length > 0) {
        let titulo = document.createElement("p");
        titulo.innerHTML = "<strong>Ingrese la información de contacto:</strong>";
        titulo.style.marginBottom = "15px";
        contenedorInfo.appendChild(titulo);
    }
    
    checkboxes.forEach((checkbox, index) => {
        let contacto = checkbox.value;
        
        let div = document.createElement("div");
        div.style.margin = "12px 0";
        div.style.padding = "12px";
        div.style.border = "1px solid #ddd";
        div.style.borderRadius = "5px";
        div.style.backgroundColor = "#f9f9f9";
        
        let label = document.createElement("label");
        label.textContent = datosContacto[contacto] + ": ";
        label.style.display = "block";
        label.style.marginBottom = "8px";
        label.style.fontWeight = "bold";
        label.style.color = "#333";
        
        let input = document.createElement("input");
        input.type = contacto === "whatsapp" ? "tel" : "text";
        input.name = "contacto_info[]";
        input.placeholder = datosContacto[contacto];
        input.minLength = 4;
        input.maxLength = 50;
        input.style.width = "100%";
        input.style.padding = "8px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "3px";
        input.required = true;
        
        div.appendChild(label);
        div.appendChild(input);
        contenedorInfo.appendChild(div);
    });
};

// Es para inicializar contactos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    poblarContactos();
    
    // Es para escuchar cambios en los checkboxes de contacto
    document.addEventListener('change', function(event) {
        if (event.target.name === 'contacto_tipo[]') {
            actualizarInfoContacto();
        }
    });
});

const datos = {
  "regiones": [
    {
      "numero": 1, "nombre": "Región de Tarapacá",
      "comunas": [
        { "id": 10301, "nombre": "Camiña" },
        { "id": 10302, "nombre": "Huara" },
        { "id": 10303, "nombre": "Pozo Almonte" },
        { "id": 10304, "nombre": "Iquique" },
        { "id": 10305, "nombre": "Pica" },
        { "id": 10306, "nombre": "Colchane" },
        { "id": 10307, "nombre": "Alto Hospicio" }
      ]
    },
    {
      "numero": 2, "nombre": "Región de Antofagasta",
      "comunas": [
        { "id": 20101, "nombre": "Tocopilla" },
        { "id": 20102, "nombre": "Maria Elena" },
        { "id": 20201, "nombre": "Ollague" },
        { "id": 20202, "nombre": "Calama" },
        { "id": 20203, "nombre": "San Pedro Atacama" },
        { "id": 20301, "nombre": "Sierra Gorda" },
        { "id": 20302, "nombre": "Mejillones" },
        { "id": 20303, "nombre": "Antofagasta" },
        { "id": 20304, "nombre": "Taltal" }
      ]
    },
    {
      "numero": 3, "nombre": "Región de Atacama",
      "comunas": [
        { "id": 30101, "nombre": "Diego de Almagro" },
        { "id": 30102, "nombre": "Chañaral" },
        { "id": 30201, "nombre": "Caldera" },
        { "id": 30202, "nombre": "Copiapo" },
        { "id": 30203, "nombre": "Tierra Amarilla" },
        { "id": 30301, "nombre": "Huasco" },
        { "id": 30302, "nombre": "Freirina" },
        { "id": 30303, "nombre": "Vallenar" },
        { "id": 30304, "nombre": "Alto del Carmen" }
      ]
    },
    {
      "numero": 4, "nombre": "Región de Coquimbo ",
      "comunas": [
        { "id": 40101, "nombre": "La Higuera" },
        { "id": 40102, "nombre": "La Serena" },
        { "id": 40103, "nombre": "Vicuña" },
        { "id": 40104, "nombre": "Paihuano" },
        { "id": 40105, "nombre": "Coquimbo" },
        { "id": 40106, "nombre": "Andacollo" },
        { "id": 40201, "nombre": "Rio Hurtado" },
        { "id": 40202, "nombre": "Ovalle" },
        { "id": 40203, "nombre": "Monte Patria" },
        { "id": 40204, "nombre": "Punitaqui" },
        { "id": 40205, "nombre": "Combarbala" },
        { "id": 40301, "nombre": "Mincha" },
        { "id": 40302, "nombre": "Illapel" },
        { "id": 40303, "nombre": "Salamanca" },
        { "id": 40304, "nombre": "Los Vilos" }
      ]
    },
    {
      "numero": 5, "nombre": "Región de Valparaíso",
      "comunas": [
        { "id": 50101, "nombre": "Petorca" },
        { "id": 50102, "nombre": "Cabildo" },
        { "id": 50103, "nombre": "Papudo" },
        { "id": 50104, "nombre": "La Ligua" },
        { "id": 50105, "nombre": "Zapallar" },
        { "id": 50201, "nombre": "Putaendo" },
        { "id": 50202, "nombre": "Santa Maria" },
        { "id": 50203, "nombre": "San Felipe" },
        { "id": 50204, "nombre": "Pencahue" },
        { "id": 50205, "nombre": "Catemu" },
        { "id": 50206, "nombre": "Llay Llay" },
        { "id": 50301, "nombre": "Nogales" },
        { "id": 50302, "nombre": "La Calera" },
        { "id": 50303, "nombre": "Hijuelas" },
        { "id": 50304, "nombre": "La Cruz" },
        { "id": 50305, "nombre": "Quillota" },
        { "id": 50306, "nombre": "Olmue" },
        { "id": 50307, "nombre": "Limache" },
        { "id": 50401, "nombre": "Los Andes" },
        { "id": 50402, "nombre": "Rinconada" },
        { "id": 50403, "nombre": "Calle Larga" },
        { "id": 50404, "nombre": "San Esteban" },
        { "id": 50501, "nombre": "Puchuncavi" },
        { "id": 50502, "nombre": "Quintero" },
        { "id": 50503, "nombre": "Viña del Mar" },
        { "id": 50504, "nombre": "Villa Alemana" },
        { "id": 50505, "nombre": "Quilpue" },
        { "id": 50506, "nombre": "Valparaiso" },
        { "id": 50507, "nombre": "Juan Fernandez" },
        { "id": 50508, "nombre": "Casablanca" },
        { "id": 50509, "nombre": "Concon" },
        { "id": 50601, "nombre": "Isla de Pascua" },
        { "id": 50701, "nombre": "Algarrobo" },
        { "id": 50702, "nombre": "El Quisco" },
        { "id": 50703, "nombre": "El Tabo" },
        { "id": 50704, "nombre": "Cartagena" },
        { "id": 50705, "nombre": "San Antonio" },
        { "id": 50706, "nombre": "Santo Domingo" }
      ]
    },
    {
      "numero": 6, "nombre": "Región del Libertador Bernardo Ohiggins",
      "comunas": [
        { "id": 60101, "nombre": "Mostazal" },
        { "id": 60102, "nombre": "Codegua" },
        { "id": 60103, "nombre": "Graneros" },
        { "id": 60104, "nombre": "Machali" },
        { "id": 60105, "nombre": "Rancagua" },
        { "id": 60106, "nombre": "Olivar" },
        { "id": 60107, "nombre": "Doñihue" },
        { "id": 60108, "nombre": "Requinoa" },
        { "id": 60109, "nombre": "Coinco" },
        { "id": 60110, "nombre": "Coltauco" },
        { "id": 60111, "nombre": "Quinta Tilcoco" },
        { "id": 60112, "nombre": "Las Cabras" },
        { "id": 60113, "nombre": "Rengo" },
        { "id": 60114, "nombre": "Peumo" },
        { "id": 60115, "nombre": "Pichidegua" },
        { "id": 60116, "nombre": "Malloa" },
        { "id": 60117, "nombre": "San Vicente" },
        { "id": 60201, "nombre": "Navidad" },
        { "id": 60202, "nombre": "La Estrella" },
        { "id": 60203, "nombre": "Marchigue" },
        { "id": 60204, "nombre": "Pichilemu" },
        { "id": 60205, "nombre": "Litueche" },
        { "id": 60206, "nombre": "Paredones" },
        { "id": 60301, "nombre": "San Fernando" },
        { "id": 60302, "nombre": "Peralillo" },
        { "id": 60303, "nombre": "Placilla" },
        { "id": 60304, "nombre": "Chimbarongo" },
        { "id": 60305, "nombre": "Palmilla" },
        { "id": 60306, "nombre": "Nancagua" },
        { "id": 60307, "nombre": "Santa Cruz" },
        { "id": 60308, "nombre": "Pumanque" },
        { "id": 60309, "nombre": "Chepica" },
        { "id": 60310, "nombre": "Lolol" }
      ]
    },
    {
      "numero": 7, "nombre": "Región del Maule",
      "comunas": [
        { "id": 70101, "nombre": "Teno" },
        { "id": 70102, "nombre": "Romeral" },
        { "id": 70103, "nombre": "Rauco" },
        { "id": 70104, "nombre": "Curico" },
        { "id": 70105, "nombre": "Sagrada Familia" },
        { "id": 70106, "nombre": "Hualañe" },
        { "id": 70107, "nombre": "Vichuquen" },
        { "id": 70108, "nombre": "Molina" },
        { "id": 70109, "nombre": "Licanten" },
        { "id": 70201, "nombre": "Rio Claro" },
        { "id": 70202, "nombre": "Curepto" },
        { "id": 70203, "nombre": "Pelarco" },
        { "id": 70204, "nombre": "Talca" },
        { "id": 70205, "nombre": "Pencahue" },
        { "id": 70206, "nombre": "San Clemente" },
        { "id": 70207, "nombre": "Constitucion" },
        { "id": 70208, "nombre": "Maule" },
        { "id": 70209, "nombre": "Empedrado" },
        { "id": 70210, "nombre": "San Rafael" },
        { "id": 70301, "nombre": "San Javier" },
        { "id": 70302, "nombre": "Colbun" },
        { "id": 70303, "nombre": "Villa Alegre" },
        { "id": 70304, "nombre": "Yerbas Buenas" },
        { "id": 70305, "nombre": "Linares" },
        { "id": 70306, "nombre": "Longavi" },
        { "id": 70307, "nombre": "Retiro" },
        { "id": 70308, "nombre": "Parral" },
        { "id": 70401, "nombre": "Chanco" },
        { "id": 70402, "nombre": "Pelluhue" },
        { "id": 70403, "nombre": "Cauquenes" }
      ]
    },
    {
      "numero": 8, "nombre": "Región del Biobío",
      "comunas": [
        { "id": 80201, "nombre": "Tome" },
        { "id": 80202, "nombre": "Florida" },
        { "id": 80203, "nombre": "Penco" },
        { "id": 80204, "nombre": "Talcahuano" },
        { "id": 80205, "nombre": "Concepcion" },
        { "id": 80206, "nombre": "Hualqui" },
        { "id": 80207, "nombre": "Coronel" },
        { "id": 80208, "nombre": "Lota" },
        { "id": 80209, "nombre": "Santa Juana" },
        { "id": 80210, "nombre": "Chiguayante" },
        { "id": 80211, "nombre": "San Pedro de la Paz" },
        { "id": 80212, "nombre": "Hualpen" },
        { "id": 80301, "nombre": "Cabrero" },
        { "id": 80302, "nombre": "Yumbel" },
        { "id": 80303, "nombre": "Tucapel" },
        { "id": 80304, "nombre": "Antuco" },
        { "id": 80305, "nombre": "San Rosendo" },
        { "id": 80306, "nombre": "Laja" },
        { "id": 80307, "nombre": "Quilleco" },
        { "id": 80308, "nombre": "Los Angeles" },
        { "id": 80309, "nombre": "Nacimiento" },
        { "id": 80310, "nombre": "Negrete" },
        { "id": 80311, "nombre": "Santa Barbara" },
        { "id": 80312, "nombre": "Quilaco" },
        { "id": 80313, "nombre": "Mulchen" },
        { "id": 80314, "nombre": "Alto Bio Bio" },
        { "id": 80401, "nombre": "Arauco" },
        { "id": 80402, "nombre": "Curanilahue" },
        { "id": 80403, "nombre": "Los Alamos" },
        { "id": 80404, "nombre": "Lebu" },
        { "id": 80405, "nombre": "Cañete" },
        { "id": 80406, "nombre": "Contulmo" },
        { "id": 80407, "nombre": "Tirua" }
      ]
    },
    {
      "numero": 9, "nombre": "Región de La Araucanía",
      "comunas": [
        { "id": 90101, "nombre": "Renaico" },
        { "id": 90102, "nombre": "Angol" },
        { "id": 90103, "nombre": "Collipulli" },
        { "id": 90104, "nombre": "Los Sauces" },
        { "id": 90105, "nombre": "Puren" },
        { "id": 90106, "nombre": "Ercilla" },
        { "id": 90107, "nombre": "Lumaco" },
        { "id": 90108, "nombre": "Victoria" },
        { "id": 90109, "nombre": "Traiguen" },
        { "id": 90110, "nombre": "Curacautin" },
        { "id": 90111, "nombre": "Lonquimay" },
        { "id": 90201, "nombre": "Perquenco" },
        { "id": 90202, "nombre": "Galvarino" },
        { "id": 90203, "nombre": "Lautaro" },
        { "id": 90204, "nombre": "Vilcun" },
        { "id": 90205, "nombre": "Temuco" },
        { "id": 90206, "nombre": "Carahue" },
        { "id": 90207, "nombre": "Melipeuco" },
        { "id": 90208, "nombre": "Nueva Imperial" },
        { "id": 90209, "nombre": "Puerto Saavedra" },
        { "id": 90210, "nombre": "Cunco" },
        { "id": 90211, "nombre": "Freire" },
        { "id": 90212, "nombre": "Pitrufquen" },
        { "id": 90213, "nombre": "Teodoro Schmidt" },
        { "id": 90214, "nombre": "Gorbea" },
        { "id": 90215, "nombre": "Pucon" },
        { "id": 90216, "nombre": "Villarrica" },
        { "id": 90217, "nombre": "Tolten" },
        { "id": 90218, "nombre": "Curarrehue" },
        { "id": 90219, "nombre": "Loncoche" },
        { "id": 90220, "nombre": "Padre Las Casas" },
        { "id": 90221, "nombre": "Cholchol" }
      ]
    },
    {
      "numero": 10, "nombre": "Región de Los Lagos",
      "comunas": [
        { "id": 100201, "nombre": "San Pablo" },
        { "id": 100202, "nombre": "San Juan" },
        { "id": 100203, "nombre": "Osorno" },
        { "id": 100204, "nombre": "Puyehue" },
        { "id": 100205, "nombre": "Rio Negro" },
        { "id": 100206, "nombre": "Purranque" },
        { "id": 100207, "nombre": "Puerto Octay" },
        { "id": 100301, "nombre": "Frutillar" },
        { "id": 100302, "nombre": "Fresia" },
        { "id": 100303, "nombre": "Llanquihue" },
        { "id": 100304, "nombre": "Puerto Varas" },
        { "id": 100305, "nombre": "Los Muermos" },
        { "id": 100306, "nombre": "Puerto Montt" },
        { "id": 100307, "nombre": "Maullin" },
        { "id": 100308, "nombre": "Calbuco" },
        { "id": 100309, "nombre": "Cochamo" },
        { "id": 100401, "nombre": "Ancud" },
        { "id": 100402, "nombre": "Quemchi" },
        { "id": 100403, "nombre": "Dalcahue" },
        { "id": 100404, "nombre": "Curaco de Velez" },
        { "id": 100405, "nombre": "Castro" },
        { "id": 100406, "nombre": "Chonchi" },
        { "id": 100407, "nombre": "Queilen" },
        { "id": 100408, "nombre": "Quellon" },
        { "id": 100409, "nombre": "Quinchao" },
        { "id": 100410, "nombre": "Puqueldon" },
        { "id": 100501, "nombre": "Chaiten" },
        { "id": 100502, "nombre": "Futaleufu" },
        { "id": 100503, "nombre": "Palena" },
        { "id": 100504, "nombre": "Hualaihue" }
      ]
    },
    {
      "numero": 11, "nombre": "Región Aisén del General Carlos Ibáñez del Campo",
      "comunas": [
        { "id": 110101, "nombre": "Guaitecas" },
        { "id": 110102, "nombre": "Cisnes" },
        { "id": 110103, "nombre": "Aysen" },
        { "id": 110201, "nombre": "Coyhaique" },
        { "id": 110202, "nombre": "Lago Verde" },
        { "id": 110301, "nombre": "Rio Ibañez" },
        { "id": 110302, "nombre": "Chile Chico" },
        { "id": 110401, "nombre": "Cochrane" },
        { "id": 110402, "nombre": "Tortel" },
        { "id": 110403, "nombre": "O'Higins" }
      ]
    },
    {
      "numero": 12, "nombre": "Región de Magallanes y la Antártica Chilena",
      "comunas": [
        { "id": 120101, "nombre": "Torres del Paine" },
        { "id": 120102, "nombre": "Puerto Natales" },
        { "id": 120201, "nombre": "Laguna Blanca" },
        { "id": 120202, "nombre": "San Gregorio" },
        { "id": 120203, "nombre": "Rio Verde" },
        { "id": 120204, "nombre": "Punta Arenas" },
        { "id": 120301, "nombre": "Porvenir" },
        { "id": 120302, "nombre": "Primavera" },
        { "id": 120303, "nombre": "Timaukel" },
        { "id": 120401, "nombre": "Antartica" }
      ]
    },
    {
      "numero": 13, "nombre": "Región Metropolitana de Santiago ",
      "comunas": [
        { "id": 130101, "nombre": "Tiltil" },
        { "id": 130102, "nombre": "Colina" },
        { "id": 130103, "nombre": "Lampa" },
        { "id": 130201, "nombre": "Conchali" },
        { "id": 130202, "nombre": "Quilicura" },
        { "id": 130203, "nombre": "Renca" },
        { "id": 130204, "nombre": "Las Condes" },
        { "id": 130205, "nombre": "Pudahuel" },
        { "id": 130206, "nombre": "Quinta Normal" },
        { "id": 130207, "nombre": "Providencia" },
        { "id": 130208, "nombre": "Santiago" },
        { "id": 130209, "nombre": "La Reina" },
        { "id": 130210, "nombre": "Ñuñoa" },
        { "id": 130211, "nombre": "San Miguel" },
        { "id": 130212, "nombre": "Maipu" },
        { "id": 130213, "nombre": "La Cisterna" },
        { "id": 130214, "nombre": "La Florida" },
        { "id": 130215, "nombre": "La Granja" },
        { "id": 130216, "nombre": "Independencia" },
        { "id": 130217, "nombre": "Huechuraba" },
        { "id": 130218, "nombre": "Recoleta" },
        { "id": 130219, "nombre": "Vitacura" },
        { "id": 130220, "nombre": "Lo Barrenechea" },
        { "id": 130221, "nombre": "Macul" },
        { "id": 130222, "nombre": "Peñalolen" },
        { "id": 130223, "nombre": "San Joaquin" },
        { "id": 130224, "nombre": "La Pintana" },
        { "id": 130225, "nombre": "San Ramon" },
        { "id": 130226, "nombre": "El Bosque" },
        { "id": 130227, "nombre": "Pedro Aguirre Cerda" },
        { "id": 130228, "nombre": "Lo Espejo" },
        { "id": 130229, "nombre": "Estacion Central" },
        { "id": 130230, "nombre": "Cerrillos" },
        { "id": 130231, "nombre": "Lo Prado" },
        { "id": 130232, "nombre": "Cerro Navia" },
        { "id": 130301, "nombre": "San Jose de Maipo" },
        { "id": 130302, "nombre": "Puente Alto" },
        { "id": 130303, "nombre": "Pirque" },
        { "id": 130401, "nombre": "San Bernardo" },
        { "id": 130402, "nombre": "Calera de Tango" },
        { "id": 130403, "nombre": "Buin" },
        { "id": 130404, "nombre": "Paine" },
        { "id": 130501, "nombre": "Peñaflor" },
        { "id": 130502, "nombre": "Talagante" },
        { "id": 130503, "nombre": "El Monte" },
        { "id": 130504, "nombre": "Isla de Maipo" },
        { "id": 130601, "nombre": "Curacavi" },
        { "id": 130602, "nombre": "Maria Pinto" },
        { "id": 130603, "nombre": "Melipilla" },
        { "id": 130604, "nombre": "San Pedro" },
        { "id": 130605, "nombre": "Alhue" },
        { "id": 130606, "nombre": "Padre Hurtado" }
      ]
    },
    {
      "numero": 14, "nombre": "Región de Los Ríos",
      "comunas": [
        { "id": 100101, "nombre": "Lanco" },
        { "id": 100102, "nombre": "Mariquina" },
        { "id": 100103, "nombre": "Panguipulli" },
        { "id": 100104, "nombre": "Mafil" },
        { "id": 100105, "nombre": "Valdivia" },
        { "id": 100106, "nombre": "Los Lagos" },
        { "id": 100107, "nombre": "Corral" },
        { "id": 100108, "nombre": "Paillaco" },
        { "id": 100109, "nombre": "Futrono" },
        { "id": 100110, "nombre": "Lago Ranco" },
        { "id": 100111, "nombre": "La Union" },
        { "id": 100112, "nombre": "Rio Bueno" }
      ]
    },
    {
      "numero": 15, "nombre": "Región Arica y Parinacota",
      "comunas": [
        { "id": 10101, "nombre": "Gral. Lagos" },
        { "id": 10102, "nombre": "Putre" },
        { "id": 10201, "nombre": "Arica" },
        { "id": 10202, "nombre": "Camarones" }
      ]
    },
    {
      "numero": 16, "nombre": "Región del Ñuble",
      "comunas": [
        { "id": 80101, "nombre": "Cobquecura" },
        { "id": 80102, "nombre": "Ñiquen" },
        { "id": 80103, "nombre": "San Fabian" },
        { "id": 80104, "nombre": "San Carlos" },
        { "id": 80105, "nombre": "Quirihue" },
        { "id": 80106, "nombre": "Ninhue" },
        { "id": 80107, "nombre": "Trehuaco" },
        { "id": 80108, "nombre": "San Nicolas" },
        { "id": 80109, "nombre": "Coihueco" },
        { "id": 80110, "nombre": "Chillan" },
        { "id": 80111, "nombre": "Portezuelo" },
        { "id": 80112, "nombre": "Pinto" },
        { "id": 80113, "nombre": "Coelemu" },
        { "id": 80114, "nombre": "Bulnes" },
        { "id": 80115, "nombre": "San Ignacio" },
        { "id": 80116, "nombre": "Ranquil" },
        { "id": 80117, "nombre": "Quillon" },
        { "id": 80118, "nombre": "El Carmen" },
        { "id": 80119, "nombre": "Pemuco" },
        { "id": 80120, "nombre": "Yungay" },
        { "id": 80121, "nombre": "Chillan Viejo" }
      ]
    }
  ]
};
// Es una función para poblar el select de regiones

const poblarRegiones = () => {
  let seleccionarRegion = document.getElementById("seleccionar-region");
  if (!seleccionarRegion) return;
  
  for (const region of datos.regiones) {
      let opcion = document.createElement("option");
      opcion.value = region.numero;
      opcion.text = region.nombre;
      seleccionarRegion.appendChild(opcion);
  }
};

const actualizarComunas = () => {
  let seleccionarRegion = document.getElementById("seleccionar-region");
  let seleccionarComuna = document.getElementById("seleccionar-comuna");
  if (!seleccionarRegion || !seleccionarComuna) return;
  
  let regionSeleccionada = seleccionarRegion.value;
  
  // Reiniciar el select de comunas
  seleccionarComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
  
  // Buscar la región correspondiente en datos.regiones
  let region = datos.regiones.find(r => r.numero == regionSeleccionada);
  
  if (region) {
      region.comunas.forEach(comuna => {
          let opcion = document.createElement("option");
          opcion.value = comuna.id;
          opcion.text = comuna.nombre;
          seleccionarComuna.appendChild(opcion);
      });
  }
};

//CONTENIDO DEL VALIDADOR TIPO.JS
// Datos de las opciones de tipo
const datosTipo = {
    "perro": "Perro",
    "gato": "Gato"
};

// Es una función para poblar el select de tipo
const poblarTipos = () => {
    let seleccionarTipo = document.getElementById("seleccionar-tipo");
    if (!seleccionarTipo) return;
    
    for (const tipo in datosTipo) {
        let opcion = document.createElement("option");
        opcion.value = tipo;
        opcion.text = datosTipo[tipo];
        seleccionarTipo.appendChild(opcion);
    }
};

//CONTENIDO DEL VALIDADOR UNIDAD.JS
//Es para definir las unidades de medida
const datosUnidad = {
    "meses": "Meses",
    "años": "Años"
};

//Es para poblar el select de unidad de medida
const poblarUnidades = () => {
    let seleccionarUnidad = document.getElementById("seleccionar-unidad");
    if (!seleccionarUnidad) return;
    
    for (const unidad in datosUnidad) {
        let opcion = document.createElement("option");
        opcion.value = unidad;
        opcion.text = datosUnidad[unidad];
        seleccionarUnidad.appendChild(opcion);
    }
};

//CONTENIDO DEL VALIDADOR.JS, EL VALIDADOR QUE VALIDA EL FORMULARIO
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

const validarCantidad = (cantidad) => {
  if (!cantidad || cantidad.trim() === '') return false;
  
  // Convertir a número
  const cantidadNumerica = Number(cantidad);
  
  // Verificar que sea un número válido (no NaN)
  if (isNaN(cantidadNumerica)) return false;
  
  // Validar que sea un número entero positivo, mínimo 1
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
  try {
    // obtener elementos del DOM usando el nombre del formulario.
    let formulario = document.forms["formulario"];
    
    let email = formulario["email"] ? formulario["email"].value : "";
    let telefono = formulario["telefono"] ? formulario["telefono"].value : "";
    let nombre = formulario["nombre"] ? formulario["nombre"].value : "";
    let fotos = formulario["fotos"] ? formulario["fotos"].files : [];
    let region = formulario["region"] ? formulario["region"].value : "";
    let comuna = formulario["comuna"] ? formulario["comuna"].value : "";
    let sector = formulario["sector"] ? formulario["sector"].value : "";
    let tipo = formulario["tipo"] ? formulario["tipo"].value : "";
    let unidad = formulario["unidad_medida"] ? formulario["unidad_medida"].value : "";
    let fecha = formulario["fecha_entrega"] ? formulario["fecha_entrega"].value : "";
    let cantidad = formulario["cantidad"] ? formulario["cantidad"].value : "";
    let edad = formulario["edad"] ? formulario["edad"].value : "";
    let descripcion = formulario["descripcion"] ? formulario["descripcion"].value : "";

    // Validación de contactos (para checkboxes múltiples)
    let contactosCheckboxes = document.querySelectorAll('input[name="contacto_tipo[]"]:checked');
    let contactosInfo = document.querySelectorAll('input[name="contacto_info[]"]');
    let contactosValidos = true;

    // Verificar que por cada contacto seleccionado haya información
    if (contactosCheckboxes.length > 0) {
      if (contactosCheckboxes.length !== contactosInfo.length) {
        contactosValidos = false;
      } else {
        // Verificar que cada campo de info de contacto tenga datos
        for (let info of contactosInfo) {
          if (!info.value || info.value.trim() === '') {
            contactosValidos = false;
            break;
          }
        }
      }
    }

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
    // Validación de contactos
    if (contactosCheckboxes.length > 0 && !contactosValidos) {
      establecerEntradaInvalida("Información de contacto");
    }
    if (!validarSeleccion(tipo)) {
      establecerEntradaInvalida("Tipo");
    }
    if (!validarSeleccion(unidad)) {
      establecerEntradaInvalida("Unidad medida");
    }
    if (!validarFecha(fecha)) {
      establecerEntradaInvalida("Fecha de entrega");
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

    // finalmente es para mostrar la validación
    let cajaValidacion = document.getElementById("caja-validacion");
    let elementoMensajeValidacion = document.getElementById("mensaje-validacion");
    let elementoListaValidacion = document.getElementById("lista-validacion");

    if (!cajaValidacion || !elementoMensajeValidacion || !elementoListaValidacion) {
      return;
    }

    if (!esValido) {
      elementoListaValidacion.textContent = "";
      // agregar elementos inválidos al elemento lista-validacion.
      for (let entrada of entradasInvalidas) {
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
      let botonEnviarConfirmar = document.createElement("button");
      botonEnviarConfirmar.innerText = "Sí, estoy seguro";
      botonEnviarConfirmar.style.marginRight = "10px";
      botonEnviarConfirmar.style.padding = "10px 20px";
      botonEnviarConfirmar.addEventListener("click", () => {
        // Es para mostrar mensaje de éxito inmediato
        elementoMensajeValidacion.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
        
        // Es para limpiar los botones anteriores
        elementoListaValidacion.textContent = "";
        
        // Es para crear botón para volver a la portada
        let botonInicio = document.createElement("button");
        botonInicio.innerText = "Volver a la portada";
        botonInicio.style.padding = "10px 20px";
        botonInicio.addEventListener("click", () => {
          window.location.href = "/";
        });
        
        elementoListaValidacion.appendChild(botonInicio);
        
        //Para hacer submit del formulario a Flask (esto guarda en la BD)
        document.forms["formulario"].submit();
      });

      let botonVolver = document.createElement("button");
      botonVolver.innerText = "No, no estoy seguro, quiero volver al formulario.";
      botonVolver.style.padding = "10px 20px";
      botonVolver.addEventListener("click", () => {
        // Mostrar el formulario nuevamente
        formulario.style.display = "block";
        cajaValidacion.hidden = true;
      });

      elementoListaValidacion.appendChild(botonEnviarConfirmar);
      elementoListaValidacion.appendChild(botonVolver);

      // hacer visible el mensaje de validación
      cajaValidacion.hidden = false;
    }

  } catch (error) {
    alert("Error en la validación: " + error.message);
  }
};

// Inicialización del formulario principal
function inicializarValidador() {
  let botonEnviar = document.getElementById("boton-enviar");
  
  if (botonEnviar) {
    botonEnviar.addEventListener("click", validarFormulario);
  } else {
    // Buscar alternativas después de un delay
    setTimeout(() => {
      let botones = document.getElementsByTagName('button');
      for (let boton of botones) {
        if (boton.textContent.includes('Agregar este aviso')) {
          boton.addEventListener("click", validarFormulario);
          break;
        }
      }
    }, 100);
  }
}


//Esta es la parte del código para los comentarios, de la tarea 3. 


//Esto es para verificar si estamos en una página de detalle de aviso
function esPaginaDetalleAviso() {
    return window.location.pathname.includes('/aviso/') && 
           document.getElementById('listaComentarios') !== null;
}

//Esto es para obtener el ID del aviso desde la URL
function obtenerAvisoIdDeUrl() {
    const path = window.location.pathname;
    const partes = path.split('/');
    for (let i = 0; i < partes.length; i++) {
        if (partes[i] === 'aviso' && i + 1 < partes.length) {
            const id = parseInt(partes[i + 1]);
            return isNaN(id) ? 0 : id;
        }
    }
    return 0;
}

//Esto es para cargar los comentarios
function cargarComentarios(avisoId) {
    if (avisoId <= 0) return;
    
    fetch(`/aviso/${avisoId}/comentarios`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar comentarios');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                mostrarComentarios(data.data);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const listaComentarios = document.getElementById('listaComentarios');
            if (listaComentarios) {
                listaComentarios.innerHTML = 
                    `<div class="mensaje-error">Error al cargar comentarios: ${error.message}</div>`;
            }
        });
}

//Esto es para mostrar los comentarios
function mostrarComentarios(comentarios) {
    const listaComentarios = document.getElementById('listaComentarios');
    if (!listaComentarios) return;
    
    if (comentarios.length === 0) {
        listaComentarios.innerHTML = '<p>No hay comentarios aún. Sé el primero en comentar.</p>';
        return;
    }

    let html = '';
    comentarios.forEach(comentario => {
        html += `
            <div class="comentario">
                <div class="comentario-header">
                    <span class="comentario-nombre">${comentario.nombre}</span>
                    <span class="comentario-fecha">${comentario.fecha}</span>
                </div>
                <div class="comentario-texto">${comentario.texto}</div>
            </div>
        `;
    });

    listaComentarios.innerHTML = html;
}

//Esto es para poder manejar el envío del formulario del comentario
function manejarEnvioComentario(avisoId) {
    const nombre = document.getElementById('nombreComentario').value.trim();
    const texto = document.getElementById('textoComentario').value.trim();
    const mensajeDiv = document.getElementById('mensajeComentario');

    //Esto es para la validación del cliente
    if (nombre.length < 3 || nombre.length > 80) {
        mensajeDiv.innerHTML = '<div class="mensaje-error">El nombre debe tener entre 3 y 80 caracteres</div>';
        return false;
    }

    if (texto.length < 5) {
        mensajeDiv.innerHTML = '<div class="mensaje-error">El comentario debe tener al menos 5 caracteres</div>';
        return false;
    }

    //Esto es para enviar el comentario
    fetch(`/aviso/${avisoId}/comentarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            texto: texto
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            mensajeDiv.innerHTML = '<div class="mensaje-exito">Comentario agregado correctamente</div>';
            document.getElementById('formularioComentario').reset();
            cargarComentarios(avisoId); //Esto sirve para poder recargar la lista de los comentarios
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mensajeDiv.innerHTML = `<div class="mensaje-error">Error al agregar comentario: ${error.message}</div>`;
    });
    
    return false;
}

//Esto es para poder inicializar los comentarios solo en la página de detalle
function inicializarComentarios() {
    if (!esPaginaDetalleAviso()) {
        return; //Acá no hay que hacer nada si no estamos en la página de detalle
    }
    
    const avisoId = obtenerAvisoIdDeUrl();
    
    if (avisoId > 0) {
        cargarComentarios(avisoId);
        
        //Esto es para configurar el evento del formulario
        const formulario = document.getElementById('formularioComentario');
        if (formulario) {
            formulario.addEventListener('submit', function(event) {
                event.preventDefault();
                manejarEnvioComentario(avisoId);
            });
        }
    }
}

//Esta es la inicialización principal, la cual consiste de un solo event listener. 
document.addEventListener('DOMContentLoaded', function() {
    //Esto es para poder inicializar el formulario principal de la adopción
    inicializarValidador();
    
    // Inicializar dropdowns
    poblarRegiones();
    poblarTipos();
    poblarUnidades();
    
    //Esto es para poder configurar el evento para las regiones
    const seleccionarRegion = document.getElementById("seleccionar-region");
    if (seleccionarRegion) {
        seleccionarRegion.addEventListener("change", actualizarComunas);
    }
    
    //Esto es para inicializar los contactos
    poblarContactos();
    
    //Esto es para inicializar los comentarios (solo en página de detalle)
    if (esPaginaDetalleAviso()) {
        inicializarComentarios();
    }
});