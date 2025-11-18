package cl.ucursos.tarea4.services;

import cl.ucursos.tarea4.models.AvisoAdopcion;
import cl.ucursos.tarea4.repositories.AvisoAdopcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AvisoAdopcionService {

    @Autowired
    private AvisoAdopcionRepository avisoRepository;

    //Es para obtener los últimos 5 avisos para mostrar en la portada
    public List<AvisoAdopcion> obtenerUltimos5Avisos() {
        return avisoRepository.findTop5ByOrderByFechaIngresoDesc();
    }

    //Es para obtener avisos paginados para el listado completo
    // Similar al servicio del auxiliar 10 pero con paginación
    public Page<AvisoAdopcion> obtenerTodosLosAvisos(@NonNull Pageable pageable) {
        return avisoRepository.findAllByOrderByFechaIngresoDesc(pageable);
    }

    // Método alternativo sin paginación para casos específicos
    public List<AvisoAdopcion> obtenerTodosLosAvisos() {
        return avisoRepository.findAll();
    }

    //Es para obtener un aviso específico por su ID
    public AvisoAdopcion obtenerAvisoPorId(@NonNull Integer id) {
        return avisoRepository.findById(id).orElse(null);
    }

    //Es para guardar un nuevo aviso o actualizar uno existente
    public AvisoAdopcion guardarAviso(@NonNull AvisoAdopcion aviso) {
        return avisoRepository.save(aviso);
    }
}