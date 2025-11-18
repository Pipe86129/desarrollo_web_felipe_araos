package cl.ucursos.tarea4.controllers;

import cl.ucursos.tarea4.models.AvisoAdopcion;
import cl.ucursos.tarea4.models.Comuna;
import cl.ucursos.tarea4.models.Foto;
import cl.ucursos.tarea4.models.ContactarPor;
import cl.ucursos.tarea4.repositories.AvisoAdopcionRepository;
import cl.ucursos.tarea4.repositories.ComunaRepository;
import cl.ucursos.tarea4.services.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
public class AppController {

    @Autowired
    private AvisoAdopcionRepository avisoRepository;

    @Autowired
    private ComunaRepository comunaRepository;

    @Autowired
    private EvaluacionService evaluacionService;

    //Es el directorio donde se guardarán las fotos subidas
    private final String UPLOAD_DIR = "uploads/";

    //Es la página principal que muestra los últimos 5 avisos
    //Es similar al indexRoute del auxiliar 10 pero para avisos de adopción
    @GetMapping("/")
    public String portada(Model model) {
        List<AvisoAdopcion> ultimosAvisos = avisoRepository.findTop5ByOrderByFechaIngresoDesc();
        model.addAttribute("ultimos_avisos", ultimosAvisos);
        return "portada";
    }

    //Es el listado paginado de todos los avisos con sistema de evaluación
    //Esto incluye la nueva funcionalidad de notas promedias de la Tarea 4
    @GetMapping("/listado")
    public String listadoCompleto(
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamaño,
            Model model) {
        
        //Esto es para crear el objeto de paginación usando Spring Data (paginación básicamente)
        Pageable pageable = PageRequest.of(pagina - 1, tamaño);
        Page<AvisoAdopcion> paginaAvisos = avisoRepository.findAllByOrderByFechaIngresoDesc(pageable);
        
        //Esto es para crear lista con datos para la vista incluyendo promedios
        List<HashMap<String, Object>> avisosData = paginaAvisos.getContent().stream().map(aviso -> {
            HashMap<String, Object> avisoData = new HashMap<>();
            avisoData.put("id", aviso.getId());
            avisoData.put("fecha_publicacion", aviso.getFechaIngreso());
            avisoData.put("sector", aviso.getSector());
            avisoData.put("cantidad", aviso.getCantidad());
            avisoData.put("tipo", aviso.getTipo());
            avisoData.put("edad", aviso.getEdad());
            avisoData.put("comuna", aviso.getComuna() != null ? aviso.getComuna().getNombre() : "");
            
            //Esto es para agregar texto de unidad de medida
            String unidadTexto = aviso.getUnidadMedida() == AvisoAdopcion.UnidadMedida.m ? "meses" : "años";
            avisoData.put("unidad_texto", unidadTexto);

            //Esto es para agregar nota promedio usando el servicio de evaluaciones
            Double promedio = evaluacionService.obtenerPromedioAviso(aviso.getId());
            avisoData.put("notaPromedio", promedio != null ? Math.round(promedio) : null);
            
            return avisoData;
        }).toList();
        
        //Esto es la información de paginación para la vista
        model.addAttribute("avisos", avisosData);
        model.addAttribute("pagina_actual", pagina);
        model.addAttribute("total_paginas", paginaAvisos.getTotalPages());
        model.addAttribute("total_avisos", paginaAvisos.getTotalElements());
        model.addAttribute("tamaño_pagina", tamaño);
        
        return "listado_de_avisos_de_adopcion";
    }

    //Esto muestra el formulario para agregar nuevo aviso
    @GetMapping("/agregar")
    public String agregarAviso() {
        return "agregar";
    }

    //Esto lo que hace es procesar el formulario de nuevo aviso con validaciones y subida de archivos
    //Es similar al postConfRoute del auxiliar 10 pero más complejo
    @PostMapping("/agregar")
    public String procesarAvisoAdopcion(
            @RequestParam("region") Integer regionId,
            @RequestParam("comuna") Integer comunaId,
            @RequestParam(value = "sector", required = false) String sector,
            @RequestParam("nombre") String nombre,
            @RequestParam("email") String email,
            @RequestParam(value = "telefono", required = false) String telefono,
            @RequestParam(value = "contacto_tipo[]", required = false) List<String> contactoTipos,
            @RequestParam(value = "contacto_info[]", required = false) List<String> contactoInfos,
            @RequestParam("tipo") String tipo,
            @RequestParam("cantidad") Integer cantidad,
            @RequestParam("edad") Integer edad,
            @RequestParam("unidad_medida") String unidadMedida,
            @RequestParam("fecha_entrega") LocalDateTime fechaEntrega,
            @RequestParam(value = "descripcion", required = false) String descripcion,
            @RequestParam("fotos") List<MultipartFile> fotos,
            Model model) {

        try {
            //Esto es para validar IDs de ubicación
            if (comunaId == null) {
                model.addAttribute("error", "Comuna no válida");
                return "agregar";
            }

            //Esto es para buscar la comuna en la base de datos
            Comuna comuna = comunaRepository.findById(comunaId).orElse(null);
            if (comuna == null) {
                model.addAttribute("error", "Comuna no válida");
                return "agregar";
            }

            //Esto es para crear el aviso de adopción con todos los datos
            AvisoAdopcion aviso = new AvisoAdopcion();
            aviso.setFechaIngreso(LocalDateTime.now());
            aviso.setComuna(comuna);
            aviso.setSector(sector);
            aviso.setNombre(nombre);
            aviso.setEmail(email);
            aviso.setCelular(telefono);
            aviso.setTipo(AvisoAdopcion.TipoMascota.valueOf(tipo));
            aviso.setCantidad(cantidad);
            aviso.setEdad(edad);
            aviso.setUnidadMedida(AvisoAdopcion.UnidadMedida.valueOf(unidadMedida));
            aviso.setFechaEntrega(fechaEntrega);
            aviso.setDescripcion(descripcion);

            //Esto es para procesar múltiples métodos de contacto
            if (contactoTipos != null && contactoInfos != null) {
                List<ContactarPor> contactos = new ArrayList<>();
                for (int i = 0; i < contactoTipos.size() && i < contactoInfos.size(); i++) {
                    String tipoContacto = contactoTipos.get(i);
                    
                    //Esto es una corrección para manejar Twitter/X correctamente
                    if ("x".equalsIgnoreCase(tipoContacto)) {
                        tipoContacto = "X";
                    }
                    
                    ContactarPor contacto = new ContactarPor();
                    contacto.setNombre(ContactarPor.TipoContacto.valueOf(tipoContacto));
                    contacto.setIdentificador(contactoInfos.get(i));
                    contacto.setAviso(aviso);
                    contactos.add(contacto);
                }
                aviso.setContactos(contactos);
            }

            //Esto es para procesar múltiples fotos con manejo seguro de archivos
            if (fotos != null && !fotos.isEmpty()) {
                List<Foto> listaFotos = new ArrayList<>();
                
                //Esto es para crear directorio si no existe
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                for (MultipartFile foto : fotos) {
                    //Esto es para validación segura para nombres de archivo
                    String nombreOriginal = foto.getOriginalFilename();
                    if (!foto.isEmpty() && nombreOriginal != null && !nombreOriginal.trim().isEmpty()) {
                        //Esto es para generar un nombre único para el archivo
                        String nombreArchivo = System.currentTimeMillis() + "_" + nombreOriginal;
                        Path filePath = uploadPath.resolve(nombreArchivo);
                        
                        //Esto es para guardar el archivo en el sistema
                        Files.copy(foto.getInputStream(), filePath);

                        //Esto es para crear entidad Foto para la base de datos
                        Foto fotoEntity = new Foto();
                        fotoEntity.setRutaArchivo(nombreArchivo);
                        fotoEntity.setNombreArchivo(nombreArchivo);
                        fotoEntity.setAviso(aviso);
                        listaFotos.add(fotoEntity);
                    }
                }
                aviso.setFotos(listaFotos);
            }

            //Esto es para guardar el aviso completo en la base de datos
            AvisoAdopcion avisoGuardado = avisoRepository.save(aviso);
            System.out.println("Aviso guardado con ID: " + avisoGuardado.getId());

            return "redirect:/?exito=true";

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Error al procesar el aviso: " + e.getMessage());
            return "agregar";
        }
    }

    // Esto es para mostrar el detalle completo de un aviso específico
    @GetMapping("/aviso/{id}")
    public String detalleAviso(@PathVariable("id") Integer id, Model model) {
        if (id == null) {
            return "redirect:/listado";
        }
        
        AvisoAdopcion aviso = avisoRepository.findById(id).orElse(null);
        if (aviso == null) {
            return "redirect:/listado";
        }
    
        // Forzar la carga de las relaciones lazy
        if (aviso.getFotos() != null) {
            aviso.getFotos().size();
        }
        if (aviso.getContactos() != null) {
            aviso.getContactos().size();
        }
        if (aviso.getComentarios() != null) {
            aviso.getComentarios().size();
        }
    
        model.addAttribute("aviso", aviso);
        return "detalle_aviso";
    }

    // Esto es para mostrar el detalle completo de un aviso específico
    @GetMapping("/estadisticas")
    public String estadisticas() {
        return "estadisticas";
    }
}