package cl.ucursos.tarea4.controllers;

import cl.ucursos.tarea4.services.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/evaluaciones")
public class EvaluacionController {

    @Autowired
    private EvaluacionService evaluacionService;

    //Esto es el endpoint para agregar nueva evaluación a un aviso
    //Parte de la nueva funcionalidad de la Tarea 4, el sistema de calificaciones
    @PostMapping("/agregar")
    public ResponseEntity<Map<String, Object>> agregarEvaluacion(
            @RequestBody Map<String, Object> requestData) {
        
        try {
            Integer avisoId = (Integer) requestData.get("avisoId");
            Integer nota = (Integer) requestData.get("nota");

            //Esto es para validar que los datos requeridos estén presentes
            if (avisoId == null || nota == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Datos incompletos"
                ));
            }

            //Esto es para delegar la lógica al servicio de evaluaciones
            Map<String, Object> resultado = evaluacionService.agregarEvaluacion(avisoId, nota);
            
            if ("success".equals(resultado.get("status"))) {
                return ResponseEntity.ok(resultado);
            } else {
                return ResponseEntity.badRequest().body(resultado);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error en el servidor: " + e.getMessage()
            ));
        }
    }

    //Esto es el endpoint para obtener el promedio de evaluaciones de un aviso
    @GetMapping("/promedio/{avisoId}")
    public ResponseEntity<Map<String, Object>> obtenerPromedio(@PathVariable Integer avisoId) {
        try {
            Double promedio = evaluacionService.obtenerPromedioAviso(avisoId);
            
            Map<String, Object> response = Map.of(
                "status", "success",
                "promedio", promedio != null ? Math.round(promedio * 10.0) / 10.0 : null
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Error al obtener promedio: " + e.getMessage()
            ));
        }
    }
}