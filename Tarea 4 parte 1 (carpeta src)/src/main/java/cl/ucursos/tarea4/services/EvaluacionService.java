package cl.ucursos.tarea4.services;

import cl.ucursos.tarea4.models.Nota;
import cl.ucursos.tarea4.repositories.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EvaluacionService {

    @Autowired
    private NotaRepository notaRepository;

    //Es para agregar nueva evaluación a un aviso
    //Es parte central del sistema de calificaciones de la Tarea 4
    public Map<String, Object> agregarEvaluacion(Integer avisoId, Integer nota) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Es para validar que la nota esté en el rango permitido (1-7)
            //Es para que cumpla con los requisitos de la Tarea 4
            if (nota < 1 || nota > 7) {
                response.put("status", "error");
                response.put("message", "La nota debe estar entre 1 y 7");
                return response;
            }

            // Es para crear y guardar la nueva nota en la base de datos
            Nota nuevaNota = new Nota(avisoId, nota);
            notaRepository.save(nuevaNota);

            // Es para calcular nuevo promedio después de agregar la evaluación
            Double nuevoPromedio = notaRepository.findPromedioByAvisoId(avisoId);

            //Es para preparar respuesta exitosa con el nuevo promedio
            response.put("status", "success");
            response.put("message", "Evaluación agregada correctamente");
            response.put("nuevoPromedio", nuevoPromedio);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error al agregar evaluación: " + e.getMessage());
        }

        return response;
    }

    //Es para obtener promedio de evaluaciones de un aviso
    //Retorna null si el aviso no tiene evaluaciones
    public Double obtenerPromedioAviso(Integer avisoId) {
        return notaRepository.findPromedioByAvisoId(avisoId);
    }

    //Es para obtener cantidad de evaluaciones de un aviso
    public Long obtenerCantidadEvaluaciones(Integer avisoId) {
        return notaRepository.countByAvisoId(avisoId);
    }
}