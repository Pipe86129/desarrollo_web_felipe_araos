package cl.ucursos.tarea4.repositories;

import cl.ucursos.tarea4.models.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer> {
    // Métodos básicos proporcionados por JpaRepository
    // No se necesitan métodos personalizados para regiones en este contexto
}