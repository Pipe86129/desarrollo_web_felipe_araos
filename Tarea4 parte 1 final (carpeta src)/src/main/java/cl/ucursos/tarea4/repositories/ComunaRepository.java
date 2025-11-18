package cl.ucursos.tarea4.repositories;

import cl.ucursos.tarea4.models.Comuna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComunaRepository extends JpaRepository<Comuna, Integer> {
    
    //Es para encontrar comunas por región usando consulta derivada
    
    List<Comuna> findByRegionId(Integer regionId);
}