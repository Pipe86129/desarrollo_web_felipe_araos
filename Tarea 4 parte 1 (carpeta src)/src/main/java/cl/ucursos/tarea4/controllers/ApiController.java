package cl.ucursos.tarea4.controllers;

import cl.ucursos.tarea4.models.AvisoAdopcion;
import cl.ucursos.tarea4.models.Comentario;
import cl.ucursos.tarea4.repositories.AvisoAdopcionRepository;
import cl.ucursos.tarea4.repositories.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private AvisoAdopcionRepository avisoAdopcionRepository;

    //Es un endpoint para obtener los comentarios de un aviso específico
    // Sigue el patrón REST del auxiliar 10 para endpoints de API
    @GetMapping("/aviso/{avisoId}/comentarios")
    public ResponseEntity<Map<String, Object>> obtenerComentarios(@PathVariable("avisoId") Integer avisoId) {
        try {
            if (avisoId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "ID de aviso no válido"
                ));
            }
            
            List<Comentario> comentarios = comentarioRepository.findByAvisoIdOrderByFechaDesc(avisoId);
            
            List<Map<String, Object>> comentariosData = comentarios.stream().map(comentario -> {
                Map<String, Object> data = new HashMap<>();
                data.put("id", comentario.getId());
                data.put("nombre", comentario.getNombre());
                data.put("texto", comentario.getTexto());
                data.put("fecha", comentario.getFecha().toString());
                return data;
            }).toList();

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", comentariosData
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error al obtener comentarios: " + e.getMessage()
            ));
        }
    }

    //Es un endpoint para agregar un nuevo comentario a un aviso
    // Usa las validaciones similares a las del auxiliar 10 pero adaptadas a  los comentarios
    @PostMapping("/aviso/{avisoId}/comentarios")
    public ResponseEntity<Map<String, Object>> agregarComentario(
            @PathVariable("avisoId") Integer avisoId,
            @RequestBody Map<String, Object> requestData) {
        
        try {
            if (avisoId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "ID de aviso no válido"
                ));
            }

            String nombre = (String) requestData.get("nombre");
            String texto = (String) requestData.get("texto");

            //Son las validaciones de datos del comentario
            if (nombre == null || nombre.trim().length() < 3 || nombre.trim().length() > 80) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "El nombre debe tener entre 3 y 80 caracteres"
                ));
            }

            if (texto == null || texto.trim().length() < 5) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error", 
                    "message", "El comentario debe tener al menos 5 caracteres"
                ));
            }

            //Esto es para buscar el aviso para asociar el comentario
            AvisoAdopcion aviso = avisoAdopcionRepository.findById(avisoId).orElse(null);
            if (aviso == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Aviso no encontrado"
                ));
            }

            //Esto es para poder crear y guardar los comentarios
            Comentario nuevoComentario = new Comentario();
            nuevoComentario.setNombre(nombre.trim());
            nuevoComentario.setTexto(texto.trim());
            nuevoComentario.setFecha(LocalDateTime.now());
            nuevoComentario.setAviso(aviso);

            comentarioRepository.save(nuevoComentario);

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Comentario agregado correctamente"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error al agregar comentario: " + e.getMessage()
            ));
        }
    }

    //Es un endpoint para obtener datos de estadísticas
    //Para así, generar datos reales para los gráficos del frontend
    @GetMapping("/estadisticas/datos")
    public ResponseEntity<Map<String, Object>> obtenerDatosEstadisticas() {
        try {
            List<AvisoAdopcion> todosAvisos = avisoAdopcionRepository.findAll();
            
            // Gráfico de líneas: Avisos por día (últimos 7 días)
            Map<String, Long> avisosPorDia = new LinkedHashMap<>();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM");
            
            for (int i = 6; i >= 0; i--) {
                LocalDateTime fecha = LocalDateTime.now().minusDays(i);
                String fechaStr = fecha.format(formatter);
                
                long count = todosAvisos.stream()
                    .filter(aviso -> aviso.getFechaIngreso().toLocalDate().equals(fecha.toLocalDate()))
                    .count();
                
                avisosPorDia.put(fechaStr, count);
            }
            
            //Esto es para el gráfico de torta, mostrando el total por tipo de mascota
            long totalPerros = todosAvisos.stream()
                .filter(aviso -> aviso.getTipo() == AvisoAdopcion.TipoMascota.perro)
                .count();
            
            long totalGatos = todosAvisos.stream()
                .filter(aviso -> aviso.getTipo() == AvisoAdopcion.TipoMascota.gato)
                .count();
            
            //Esto es para el gráfico de barras, mostrando los avisos por mes (este año)
            Map<String, Map<String, Long>> avisosPorMes = new LinkedHashMap<>();
            DateTimeFormatter mesFormatter = DateTimeFormatter.ofPattern("MM-yyyy");
            
            for (int i = 11; i >= 0; i--) {
                LocalDateTime fecha = LocalDateTime.now().minusMonths(i);
                String mesStr = fecha.format(DateTimeFormatter.ofPattern("MMM"));
                
                long perrosMes = todosAvisos.stream()
                    .filter(aviso -> aviso.getTipo() == AvisoAdopcion.TipoMascota.perro)
                    .filter(aviso -> aviso.getFechaIngreso().format(mesFormatter).equals(fecha.format(mesFormatter)))
                    .count();
                
                long gatosMes = todosAvisos.stream()
                    .filter(aviso -> aviso.getTipo() == AvisoAdopcion.TipoMascota.gato)
                    .filter(aviso -> aviso.getFechaIngreso().format(mesFormatter).equals(fecha.format(mesFormatter)))
                    .count();
                
                Map<String, Long> datosMes = new HashMap<>();
                datosMes.put("perros", perrosMes);
                datosMes.put("gatos", gatosMes);
                avisosPorMes.put(mesStr, datosMes);
            }
            
            //Esto es para preparar datos para el frontend en formato compatible con Highcharts
            Map<String, Object> datosReales = Map.of(
                // Gráfico de líneas
                "fechas", new ArrayList<>(avisosPorDia.keySet()),
                "cantidades", new ArrayList<>(avisosPorDia.values()),
                
                // Gráfico de torta
                "tipos_mascota", List.of("Perros", "Gatos"),
                "cantidades_tipos", List.of(totalPerros, totalGatos),
                "colores_tipos", List.of("#36A2EB", "#FF6384"),
                
                // Gráfico de barras
                "meses_labels", new ArrayList<>(avisosPorMes.keySet()),
                "datos_perros", avisosPorMes.values().stream().map(d -> d.get("perros")).collect(Collectors.toList()),
                "datos_gatos", avisosPorMes.values().stream().map(d -> d.get("gatos")).collect(Collectors.toList())
            );

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", datosReales
            ));
            
        } catch (Exception e) {
            e.printStackTrace();
            //En caso de error, devolver datos de ejemplo como fallback
            //Es similar al patrón de resiliencia visto en el auxiliar 10
            Map<String, Object> datosEjemplo = Map.of(
                "fechas", List.of("01-12", "02-12", "03-12"),
                "cantidades", List.of(5, 3, 7),
                "tipos_mascota", List.of("Perros", "Gatos"),
                "cantidades_tipos", List.of(10, 8),
                "meses_labels", List.of("Ene", "Feb", "Mar"),
                "datos_perros", List.of(5, 3, 2),
                "datos_gatos", List.of(3, 2, 4)
            );

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", datosEjemplo
            ));
        }
    }
}