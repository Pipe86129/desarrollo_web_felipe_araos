package cl.ucursos.tarea4.repositories;

import cl.ucursos.tarea4.models.AvisoAdopcion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AvisoAdopcionRepository extends JpaRepository<AvisoAdopcion, Integer> {

    //Esto es para encontrar últimos 5 avisos para la portada
    List<AvisoAdopcion> findTop5ByOrderByFechaIngresoDesc();

    //Esto es para encontrar avisos paginados ordenados por fecha descendente
    // Similar al patrón de paginación visto en el auxiliar 10
    Page<AvisoAdopcion> findAllByOrderByFechaIngresoDesc(Pageable pageable);
    
    //Esto es para contar total de avisos
    @Query("SELECT COUNT(a) FROM AvisoAdopcion a")
    Long countTotalAvisos();
}